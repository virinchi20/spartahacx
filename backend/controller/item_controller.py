# controller/item_controller.py
from flask import jsonify, request
import app
from services.food_analysis_service import FoodAnalysisService
from services.item_service import ItemService
from werkzeug.utils import secure_filename
import os

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
        "id": item.id,
        "username": item.username,
        "name": item.name,
        "expiresAt": item.expiry,
    } for item in items])

@app.route('/items/analyze', methods=['POST'])
async def analyze_and_create_items():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        
        image_file = request.files['image']
        username = request.form.get('username')
        
        if not username:
            return jsonify({"error": "Username is required"}), 400
            
        if image_file.filename == '':
            return jsonify({"error": "No selected file"}), 400
            
        analyzed_items = await food_analysis_service.analyze_image(image_file, username)
        created_items = item_service.create_items_from_analysis(username, analyzed_items)
        
        return jsonify({
            "message": "Success",
            "items": created_items
        }), 201
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/items/checksafety', methods=['POST'])
async def check_safety():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        
        image_file = request.files['image']
        username = request.form.get('username')

        if not username:
            return jsonify({"error": "Username is required"}), 400
        
        if image_file.filename == '':
            return jsonify({"error": "No selected file"}), 400
        
        check_item = await food_analysis_service.safe_to_eat(image_file, username)

        return jsonify({
            "message": "success",
            "safe_to_eat": check_item
        }), 201
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500