'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  const [uploadKey, setUploadKey] = useState(0);

  const handleUploadSuccess = () => {
    // Trigger a re-render or show success state
    setUploadKey((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏥 Medical Assistant Chatbot
          </h1>
          <p className="text-gray-600">
            Upload your medical documents and ask questions powered by AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <div>
            <FileUpload onUploadSuccess={handleUploadSuccess} />
          </div>
          
          <div>
            <ChatInterface key={uploadKey} />
          </div>
        </div>

        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>Powered by RAG • Groq • Pinecone • LangChain</p>
        </footer>
      </div>
    </main>
  );
}