import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv

load_dotenv()

embed_model = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001", # The stable 2026 model
    google_api_key=os.getenv("GOOGLE_API_KEY"),
    task_type="retrieval_document",
    output_dimensionality=768  # <--- THIS IS CRITICAL
)