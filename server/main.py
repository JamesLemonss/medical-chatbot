from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from middlewares.exception_handlers import catch_exception_middleware
from routes.upload_pdfs import router as upload_router
from routes.ask_question import router as ask_router

app=FastAPI(title="Medical Assistant API",description="API for AI Medical Assistant Chatbot")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,  # Changed from ["*"] to True
    allow_methods=["*"],
    allow_headers=["*"]
)

# middleware exception handlers
app.middleware("http")(catch_exception_middleware)

# routers
app.include_router(upload_router)
app.include_router(ask_router)

# ADD THIS AT THE BOTTOM:
if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)