from typing import Optional
from bson import ObjectId
from datetime import datetime

class User:
    def __init__(
        self,
        id: ObjectId,
        email: str,
        name: str,
        username: str,
        password: str,
        email_verified: bool = False,
        profile_picture: Optional[str] = None,
        bio: str = ""
    ):
        self._id = id
        self.email = email
        self.name = name
        self.username = username
        self.password = password
        self.email_verified = email_verified
        self.profile_picture = profile_picture
        self.bio = bio

    @property
    def id(self) -> ObjectId:
        return self._id
    
    @classmethod
    def from_dict(cls, data: dict) -> 'User':
        """Create a User instance from a dictionary (e.g., MongoDB document)"""
        return cls(
            id=ObjectId(data['_id']['$oid']) if isinstance(data['_id'], dict) else data['_id'],
            email=data['email'],
            name=data['name'],
            username=data['username'],
            password=data['password'],
            email_verified=data.get('emailVerified', False),
            profile_picture=data.get('profilePicture'),
            bio=data.get('bio', '')
        )
    
    def to_dict(self) -> dict:
        """Convert User instance to a dictionary (for MongoDB storage)"""
        return {
            '_id': self._id,
            'email': self.email,
            'name': self.name,
            'username': self.username,
            'password': self.password,
            'emailVerified': self.email_verified,
            'profilePicture': self.profile_picture,
            'bio': self.bio
        }