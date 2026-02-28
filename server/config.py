import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv

load_dotenv()

embed_model = GoogleGenerativeAIEmbeddings(
    model="text-embedding-004",
    google_api_key=os.getenv("GOOGLE_API_KEY"),
    task_type="retrieval_document"
)