export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface UploadResponse {
  messages: string;
}

export interface AskResponse {
  response: string;  // ✅ Correct - matches your backend
  sources?: string[];  // ✅ Matches what your backend actually returns
}