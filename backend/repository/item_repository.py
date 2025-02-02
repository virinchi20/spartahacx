# repository/item_repository.py
from typing import List, Optional, Dict, Any
from datetime import datetime
from bson import ObjectId
from flask_pymongo import MongoClient
import certifi

mongo = MongoClient("mongodb+srv://sparta:hack@cluster0.m4ry3.mongodb.net/", tlsCAFile=certifi.where())
class ItemRepository:
    def __init__(self):
        self.collection = mongo.test.items

    def insert_one(self, item_data: Dict[str, Any]) -> int:
        result = self.collection.insert_one(item_data)
        return result.inserted_id
    
    def insert_many(self, items: List[Dict[str, Any]]) -> List[int]:
        result = self.collection.insert_many(items)
        return result.inserted_ids

    def find_by_id(self, item_id: int) -> Optional[Dict[str, Any]]:
        return self.collection.find_one({"_id": item_id})

    def find_by_username(self, username: str) -> List[Dict[str, Any]]:
        return list(self.collection.find({"username": username}))

    def update_by_id(self, item_id: int, update_data: Dict[str, Any]) -> bool:
        result = self.collection.update_one(
            {"_id": item_id},
            {"$set": update_data}
        )
        return result.modified_count > 0

    def delete_by_id(self, item_id: str) -> bool:
        print(item_id)
        result = self.collection.delete_one({"_id": item_id})
        return result.deleted_count > 0
    
    def delete_by_object_id(self, object_id: str) -> bool:
        try:
            result = self.collection.delete_one({"_id": ObjectId(object_id)})
            return result.deleted_count > 0
        except Exception as e:
            print(f"Repository - Delete error: {str(e)}")
            return False