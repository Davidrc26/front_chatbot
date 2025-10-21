// Servicio para comunicación con FastAPI

import type { ChatbotConfig, Message } from '@/types/chatbot'

const API_BASE_URL = 'http://localhost:8000' // Cambia el puerto si es necesario

export interface ChatRequest {
  message: string
  user_id?: string
  use_rag?: boolean
  n_results?: number
  use_rerank?: boolean
}

export interface ChatResponse {
  response: string
  success: boolean
  sources?: string[]
  metadatas?: Array<Record<string, unknown>>
  found_documents?: boolean
  reranked?: boolean
}

export class ChatbotApiService {
  private baseUrl: string
  private userId: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
    // Generar un ID de usuario único para la sesión
    this.userId = this.generateUserId()
  }

  /**
   * Genera un ID único para el usuario
   */
  private generateUserId(): string {
    return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Envía un mensaje al chatbot de FastAPI
   */
  async sendMessage(message: string, config: ChatbotConfig): Promise<ChatResponse> {
    try {
      const requestBody: ChatRequest = {
        message,
        user_id: this.userId,
        use_rag: config.useRag,
        n_results: config.nResults,
        use_rerank: config.useRerank,
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
   * Obtiene el ID del usuario actual
   */
  getUserId(): string {
    return this.userId
  }
}

// Instancia singleton del servicio
export const chatbotApi = new ChatbotApiService()
