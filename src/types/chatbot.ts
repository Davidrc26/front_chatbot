// Tipos para el chatbot

export type ModelType = 'llama' | 'gemini'
export type ChatMode = 'simple' | 'rag' | 'rag-llamaindex' | 'conversation'

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  sources?: string[]
  metadatas?: Array<Record<string, unknown>>
}

export interface ChatbotConfig {
  provider: ModelType
  chatMode: ChatMode
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
  provider: 'llama',
  chatMode: 'conversation',
  nResults: 3,
  useRerank: true,
}

export const CONFIG_INFO = {
  provider: {
    label: 'Proveedor LLM',
    description: 'Modelo de lenguaje a utilizar',
    options: {
      llama: { name: 'LLaMA', description: 'Modelo de Meta AI' },
      gemini: { name: 'Gemini', description: 'Modelo de Google AI' },
    },
  },
  chatMode: {
    label: 'Modo de Chat',
    description: 'Tipo de interacción con el chatbot',
    options: {
      simple: { name: 'Simple', description: 'Sin contexto de documentos' },
      rag: { name: 'RAG', description: 'Con búsqueda en documentos' },
      'rag-llamaindex': { name: 'RAG LlamaIndex', description: 'RAG con gestión LlamaIndex' },
      conversation: { name: 'Conversación', description: 'Con historial y RAG' },
    },
  },
  nResults: {
    label: 'Número de Documentos',
    description: 'Cantidad de documentos a recuperar (solo en modo RAG/Conversación)',
    min: 1,
    max: 20,
  },
  useRerank: {
    label: 'Usar Reranking',
    description: 'Aplicar reordenamiento para mejorar la calidad (recomendado)',
  },
}
