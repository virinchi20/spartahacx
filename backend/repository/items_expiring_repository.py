# repository/item_repository.py
from typing import List, Optional, Dict, Any
from datetime import datetime
from bson import ObjectId
from flask_pymongo import MongoClient
import certifi

mongo = MongoClient("mongodb+srv://sparta:hack@cluster0.m4ry3.mongodb.net/", tlsCAFile=certifi.where())
class ItemExpiringRepository:
    def __init__(self):
        self.collection = mongo.test.items_expiring

    def find_by_username(self, username: str) -> List[Dict[str, Any]]:
        return list(self.collection.find({"username": username}))

    def delete_by_id(self, item_id: int) -> bool:
        result = self.collection.delete_one({"_id": item_id})
        return result.deleted_count > 0
    
    def delete_by_object_id(self, object_id: str) -> bool:
        try:
            result = self.collection.delete_one({"_id": ObjectId(object_id)})
            return result.deleted_count > 0
        except Exception as e:
            print(f"Repository - Delete error: {str(e)}")
            return False