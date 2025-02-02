from openai import OpenAI
from pydantic import BaseModel
import json
import base64
from typing import List

class Item(BaseModel):
        name: str
        expiresAt: float  # Using float since JSON Schema 'number' covers both int and float

class ItemsListAndExpiry(BaseModel):
    list_of_objects: List[Item]

class FoodAnalysisService:

    from typing import List

        
    def __init__(self):
        self.client = OpenAI()

    def analyze_image(self, image_file, username: str) -> List[dict]:
        # Convert the uploaded file to base64
        image_data = image_file.read()
        base64_image = base64.b64encode(image_data).decode('utf-8')
        
        try:
            completion = self.client.beta.chat.completions.parse(
                model="gpt-4o",  # Note: using the vision model
                messages=[
                    {
                        "role": "system",
                        "content": "you are an expert at extracting grocery items from an image and their average expire lifetime in days and give the output in json format returned as an object containing 'name' (string) and 'expiresAt' (number)"
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text", 
                                "text": "What grocery items are in this image? give the output in a python list type along with the average expire in days."
                            },
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{base64_image}"
                                }
                            },
                        ],
                    }
                ],
                response_format=ItemsListAndExpiry,
            )
            reply = completion.choices[0].message
            return json.loads(reply.content)
        except Exception as e:
            raise Exception(f"OpenAI API error: {str(e)}")