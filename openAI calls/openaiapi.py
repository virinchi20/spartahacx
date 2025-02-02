#from langchain.chat_models import ChatOpenAI
from langchain_community.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
import os
from dotenv import load_dotenv

load_dotenv()

PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context: {question}
"""

def chat_with_gpt(query):

    chat = ChatOpenAI(model="gpt-4")

    response = chat([HumanMessage(content=query)])

    return response.content
    
def get_response(query):
    model = ChatOpenAI()
    response_text = model.invoke(query).content
    print(response_text)

if __name__ == "main":
    #user_input = input("Input your query: ")
    #response = chat_with_gpt("who is the president of the united states")
    #print("\nCHatGPT Response: \n", response)
    get_response("who is the president of the united states")

