from pydantic import BaseModel
from openai import OpenAI
import os
import json
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()

class GroceryDataExtraction(BaseModel):
    item: str
    exp: int

completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "system",
            "content": "you are an expert at extracting grocery items from an image and their average expire lifetime in days and give the output in json format"
        },
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "What grocery items are in this image? give the output in a python list type along with the average expire in days"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://media.gettyimages.com/id/171302954/photo/groceries.jpg?s=612x612&w=gi&k=20&c=V1rR0STPdGb4AF4N9cvx0ZjNQodolWAOVHkLDqj4ATI=",
                    }
                },
            ],
        }
    ],
    response_format={"type": "json_object"},
)


reply = completion.choices[0].message

#print(reply)

def parse_string_to_json(unparse_string):
    return json.loads(unparse_string)

myData = parse_string_to_json(reply.content)

print(myData)