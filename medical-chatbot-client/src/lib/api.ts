import axios from 'axios';
import { UploadResponse, AskResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const uploadPDFs = async (files: File[]): Promise<UploadResponse> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await api.post<UploadResponse>('/upload_pdfs/', formData);
  return response.data;
};

export const askQuestion = async (question: string): Promise<AskResponse> => {
  const formData = new FormData();
  formData.append('question', question);

  const response = await api.post<AskResponse>('/ask/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};