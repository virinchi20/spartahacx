# repository/item_repository.py
from typing import List, Optional, Dict, Any
from datetime import datetime
from flask_pymongo import MongoClient

mongo = MongoClient("mongodb://localhost:27017/FoodAnalyzer")
class ItemExpiringRepository:
    def __init__(self):
        self.collection = mongo.FoodAnalyzer.items_expiring

    def find_by_username(self, username: str) -> List[Dict[str, Any]]:
        return list(self.collection.find({"username": username}))

    def delete_by_id(self, item_id: int) -> bool:
        result = self.collection.delete_one({"_id": item_id})
        return result.deleted_count > 0