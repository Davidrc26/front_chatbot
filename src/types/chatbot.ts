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
  temperature: number
  maxTokens: number
  topP: number
  topK: number
  presencePenalty: number
  frequencyPenalty: number
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
  temperature: 0.7,
  maxTokens: 2048,
  topP: 0.9,
  topK: 40,
  presencePenalty: 0,
  frequencyPenalty: 0,
}

export const MODEL_INFO = {
  llama: {
    name: 'LLaMA',
    description: 'Modelo de Meta AI optimizado para conversaciones',
    maxTokens: 4096,
  },
  gemini: {
    name: 'Gemini',
    description: 'Modelo de Google AI con capacidades multimodales',
    maxTokens: 8192,
  },
}
