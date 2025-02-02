from datetime import datetime
from typing import Optional

class Item:
    def __init__(
        self,
        # id: int,
        username: str,
        name: str,
        expiresAt: Optional[datetime] = None,
    ):
        # self._id = id
        self.username = username
        self.name = name
        self.expiresAt = expiresAt

    # @property
    # def id(self) -> int:
    #     return self._id