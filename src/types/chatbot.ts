// Tipos para el chatbot

export type ModelType = 'llama' | 'gemini'

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  sources?: string[]
  metadatas?: Array<Record<string, unknown>>
}

export interface ChatbotConfig {
  useRag: boolean
  nResults: number
  useRerank: boolean
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
  useRag: true,
  nResults: 3,
  useRerank: true,
}

export const CONFIG_INFO = {
  useRag: {
    label: 'Usar RAG',
    description: 'Activar búsqueda en documentos para contextualizar las respuestas',
  },
  nResults: {
    label: 'Número de Documentos',
    description: 'Cantidad de documentos a recuperar del contexto',
    min: 1,
    max: 20,
  },
  useRerank: {
    label: 'Usar Reranking',
    description: 'Aplicar reordenamiento para mejorar la calidad (recomendado)',
  },
}
