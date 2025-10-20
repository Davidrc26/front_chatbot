// Tipos para el chatbot

export type ModelType = 'llama' | 'gemini'

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  model?: ModelType
}

export interface ChatbotConfig {
  model: ModelType
  numDocuments: number
  useReranking: boolean
}

export interface ChatSession {
  id: string
  title: string
  messages: Message[]
  config: ChatbotConfig
  createdAt: Date
  updatedAt: Date
}

export const DEFAULT_CONFIG: ChatbotConfig = {
  model: 'llama',
  numDocuments: 5,
  useReranking: false,
}

export const MODEL_INFO = {
  llama: {
    name: 'LLaMA',
    description: 'Modelo de Meta AI optimizado para conversaciones sobre IA',
  },
  gemini: {
    name: 'Gemini',
    description: 'Modelo de Google AI con capacidades avanzadas',
  },
}
