# services/item_service.py
from typing import List, Optional
from datetime import datetime, timedelta
from models.Item import Item
from repository.item_repository import ItemRepository
from repository.items_expiring_repository import ItemExpiringRepository

class ItemService:
    def __init__(self):
        self.repository = ItemRepository()
        self.items_expiring_repo = ItemExpiringRepository()

    def create_item(self, username: str, name: str, expiresAt: Optional[datetime] = None) -> Item:
        item_data = {
            "username": username,
            "name": name,
            "expiresAt": expiresAt
        }
        item_id = self.repository.insert_one(item_data)
        return Item(
            id=item_id,
            username=username,
            name=name,
            expiresAt=expiresAt
        )

    def get_item_by_id(self, item_id: int) -> Optional[Item]:
        item_data = self.repository.find_by_id(item_id)
        if item_data:
            return Item(
                id=item_data["_id"],
                username=item_data["username"],
                name=item_data["name"],
                expiresAt=item_data.get("expiresAt")
            )
        return None

    def get_items_by_username(self, username: str) -> List[Item]:
            items_data = self.repository.find_by_username(username)
            items_list = []
            
            for item in items_data:
                try:
                    # First log what we got from the database
                    print(f"Processing item from DB: {item}")
                    
                    item_obj = Item(
                        _id=str(item.get('_id')),
                        username=item.get('username', ''),
                        name=item.get('name', ''),
                        expiresAt=item.get('expiresAt')
                    )
                    items_list.append(item_obj)
                except Exception as e:
                    print(f"Error creating item object: {str(e)}")
                    print(f"Problematic item data: {item}")
                    continue
                    
            return items_list
    
    def get_items_expiring_by_username(self, username: str) -> List[Item]:
            items_data = self.items_expiring_repo.find_by_username(username)
            items_list = []
            
            for item in items_data:
                try:
                    # First log what we got from the database
                    print(f"Processing item from DB: {item}")
                    
                    item_obj = Item(
                        _id=str(item.get('_id')),
                        username=item.get('username', ''),
                        name=item.get('name', ''),
                        expiresAt=item.get('expiresAt')
                    )
                    items_list.append(item_obj)
                except Exception as e:
                    print(f"Error creating item object: {str(e)}")
                    print(f"Problematic item data: {item}")
                    continue
                    
            return items_list
        

    def update_item(self, item_id: int, update_data: dict) -> Optional[Item]:
        success = self.repository.update_by_id(item_id, update_data)
        if success:
            return self.get_item_by_id(item_id)
        return None

    def delete_item(self, item_id: str) -> bool:
        return self.repository.delete_by_id(item_id)
    
    def create_items_from_analysis(self, username: str, analyzed_items: dict) -> List[Item]:
        items_to_create = []
        # Assuming the OpenAI response contains a list under 'items' key
        for item_data in analyzed_items.get('list_of_objects', []):
            item = {
                "username": username,
                "name": item_data['name'],
                "expiresAt": (datetime.fromisoformat(datetime.now().date().isoformat()) + timedelta(days=item_data['expiresAt'])).isoformat()
            }
            items_to_create.append(item)
        created_ids = self.repository.insert_many(items_to_create)
        

        return items_to_create
    
    def delete_item_by_id(self, object_id: str) -> bool:
        try:
            return self.repository.delete_by_object_id(object_id)
        except Exception as e:
            print(f"Service - Delete error: {str(e)}")
            return False
        

    def delete_item_expiring_by_id(self, object_id: str) -> bool:
        try:
            return self.items_expiring_repo.delete_by_object_id(object_id)
        except Exception as e:
            print(f"Service - Delete error: {str(e)}")
            return False