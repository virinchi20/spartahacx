from pydantic import BaseModel
from openai import OpenAI
import os
import json
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()

class FoodCheck(BaseModel):
    safe: bool
    explaination: str

completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "system",
            "content": "you are an expert at analyzing food and giving a verdict on if the food is safe to eat or should be thrown away. give a structured json output"
        },
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Is the food item in the image safe to eat or should it be thrown away? give true if it is safe else give false. Give the explaination"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://images-prod.healthline.com/hlcmsresource/images/AN_images/can-you-eat-moldy-bread-1296x728-feature.jpg",
                    }
                },
            ],
        }
    ],
    response_format={"type": "json_object"},
)

reply = completion.choices[0].message

print(reply)

def parse_string_to_json(unparse_string):
    return json.loads(unparse_string)

myData = parse_string_to_json(reply.content)

print(myData)