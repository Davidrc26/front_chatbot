// Servicio para comunicación con FastAPI

import type { ChatbotConfig, Message } from '@/types/chatbot'

const API_BASE_URL = 'http://localhost:8000' // Cambia el puerto si es necesario

export interface ChatRequest {
  message: string
  model: string
  numDocuments: number
  useReranking: boolean
  conversationHistory?: Array<{ role: string; content: string }>
}

export interface ChatResponse {
  response: string
  model: string
  documentsUsed?: number
  reranking?: boolean
  error?: string
}

export class ChatbotApiService {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  /**
   * Envía un mensaje al chatbot de FastAPI
   */
  async sendMessage(
    message: string,
    config: ChatbotConfig,
    conversationHistory: Message[] = []
  ): Promise<ChatResponse> {
    try {
      // Formatear el historial de conversación para la API
      const history = conversationHistory
        .filter((msg) => msg.role !== 'system')
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))

      const requestBody: ChatRequest = {
        message,
        model: config.model,
        numDocuments: config.numDocuments,
        useReranking: config.useReranking,
        conversationHistory: history.length > 0 ? history : undefined,
      }

      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.detail || `Error del servidor: ${response.status} ${response.statusText}`
        )
      }

      const data: ChatResponse = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al comunicarse con el servidor: ${error.message}`)
      }
      throw new Error('Error desconocido al comunicarse con el servidor')
    }
  }

  /**
   * Verifica que el servidor esté disponible
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
      })
      return response.ok
    } catch (error) {
      console.error('Health check falló:', error)
      return false
    }
  }

  /**
   * Obtiene los modelos disponibles
   */
  async getAvailableModels(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error('Error al obtener modelos disponibles')
      }

      const data = await response.json()
      return data.models || ['llama', 'gemini']
    } catch (error) {
      console.error('Error obteniendo modelos:', error)
      return ['llama', 'gemini'] // Valores por defecto
    }
  }
}

// Instancia singleton del servicio
export const chatbotApi = new ChatbotApiService()
