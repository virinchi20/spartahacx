from flask import Flask,jsonify,request
from flask_pymongo import PyMongo
from flask_socketio import SocketIO
from dotenv import load_dotenv

from services.food_analysis_service import FoodAnalysisService
from services.item_service import ItemService

load_dotenv()


app = Flask(__name__)
# app.config["MONGO_URI"]="mongodb://localhost:27017/FoodAnalyzer"

# mongo = PyMongo(app)
socketio = SocketIO(app)
# @app.route('/')
# def index():
#       collection = mongo.db.users
#       documents = collection.find()
#       return jsonify([doc for doc in documents])


# @socketio.on('connect')
# def handle_connect():
#     print('Client connected')
    
# @socketio.on('message')
# def handle_message(message):
#     print('Received message:', message)
#     socketio.emit('response', 'Message received', broadcast=True)
food_analysis_service = FoodAnalysisService()
item_service = ItemService()

@app.route('/items', methods=['POST'])
def create_item():
    data = request.get_json()
    item = item_service.create_item(
        username=data['username'],
        name=data['name'],
        expiresAt=data.get('expiresAt')
    )
    return jsonify({"message": "Item created successfully", "id": item.id}), 201

@app.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = item_service.get_item_by_id(item_id)
    if item:
        return jsonify({
            "id": item.id,
            "username": item.username,
            "name": item.name,
            "expiresAt": item.expiry,
            
        })
    return jsonify({"message": "Item not found"}), 404

@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.get_json()
    updated_item = item_service.update_item(item_id, data)
    if updated_item:
        return jsonify({"message": "Item updated successfully"})
    return jsonify({"message": "Item not found"}), 404

@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    if item_service.delete_item(item_id):
        return jsonify({"message": "Item deleted successfully"})
    return jsonify({"message": "Item not found"}), 404

@app.route('/items/user/<username>', methods=['GET'])
def get_user_items(username):
    items = item_service.get_items_by_username(username)
    return jsonify([{
        "id": item._id,
        "username": item.username,
        "name": item.name,
        "expiresAt": item.expiresAt,
    } for item in items])

@app.route('/items_expiring/user/<username>', methods=['GET'])
def get_user_items_expiring(username):
    items = item_service.get_items_expiring_by_username(username)
    return jsonify([{
        "id": item._id,
        "username": item.username,
        "name": item.name,
        "expiresAt": item.expiresAt,
    } for item in items])

@app.route('/items/analyze', methods=['POST'])
def analyze_and_create_items():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
        
    image_file = request.files['image']
    username = request.form.get('username')
        
    if not username:
        return jsonify({"error": "Username is required"}), 400
            
    if image_file.filename == '':
        return jsonify({"error": "No selected file"}), 400
            
    analyzed_items = food_analysis_service.analyze_image(image_file, username)
    print("app",analyzed_items["list_of_objects"])
    created_items = item_service.create_items_from_analysis(username, analyzed_items)
        
    return jsonify({
        "message": "Success",
    }), 201
        
    




if __name__ == '__main__':
    app.run(debug=True)
