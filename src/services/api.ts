// Servicio para comunicación con FastAPI

import type { ChatbotConfig, Message } from '@/types/chatbot'

const API_BASE_URL = 'http://localhost:8000' // Cambia el puerto si es necesario

// Request simple
export interface ChatSimpleRequest {
  message: string
  user_id?: string
}

// Request RAG
export interface ChatRagRequest {
  message: string
  user_id?: string
  n_results?: number
  use_rerank?: boolean
}

// Request con historial
export interface ChatHistoryRequest {
  message: string
  user_id?: string
  chat_history: Array<{ role: string; content: string }>
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
   * Envía un mensaje al chatbot según el modo configurado
   */
  async sendMessage(
    message: string,
    config: ChatbotConfig,
    conversationHistory: Message[] = []
  ): Promise<ChatResponse> {
    const { chatMode, provider } = config

    switch (chatMode) {
      case 'simple':
        return this.sendSimpleMessage(message, provider)
      case 'rag':
        return this.sendRagMessage(message, config, provider)
      case 'rag-llamaindex':
        return this.sendRagLlamaIndexMessage(message, config, provider)
      case 'conversation':
        return this.sendConversationMessage(message, config, provider, conversationHistory)
      default:
        throw new Error(`Modo de chat no soportado: ${chatMode}`)
    }
  }

  /**
   * Chat simple sin contexto de documentos
   */
  private async sendSimpleMessage(message: string, provider: string): Promise<ChatResponse> {
    try {
      const requestBody: ChatSimpleRequest = {
        message,
        user_id: this.userId,
      }

      const response = await fetch(
        `${this.baseUrl}/api/v1/chat/simple?provider=${encodeURIComponent(provider)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      )

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
   * Chat con RAG (búsqueda en documentos)
   */
  private async sendRagMessage(
    message: string,
    config: ChatbotConfig,
    provider: string
  ): Promise<ChatResponse> {
    try {
      const requestBody: ChatRagRequest = {
        message,
        user_id: this.userId,
        n_results: config.nResults,
        use_rerank: config.useRerank,
      }

      const response = await fetch(
        `${this.baseUrl}/api/v1/chat/rag?provider=${encodeURIComponent(provider)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      )

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
   * Chat con RAG usando LlamaIndex
   */
  private async sendRagLlamaIndexMessage(
    message: string,
    config: ChatbotConfig,
    provider: string
  ): Promise<ChatResponse> {
    try {
      const requestBody: ChatRagRequest = {
        message,
        user_id: this.userId,
        n_results: config.nResults,
        use_rerank: config.useRerank,
      }

      const response = await fetch(
        `${this.baseUrl}/api/v1/chat/rag/with/llamaindex?provider=${encodeURIComponent(provider)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      )

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
   * Chat con historial de conversación (y opcionalmente RAG)
   */
  private async sendConversationMessage(
    message: string,
    config: ChatbotConfig,
    provider: string,
    conversationHistory: Message[]
  ): Promise<ChatResponse> {
    try {
      // Formatear el historial de conversación para la API
      const history = conversationHistory
        .filter((msg) => msg.role !== 'system')
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))

      const requestBody: ChatHistoryRequest = {
        message,
        user_id: this.userId,
        chat_history: history,
        use_rag: true, // En modo conversación siempre usamos RAG
        n_results: config.nResults,
        use_rerank: config.useRerank,
      }

      const response = await fetch(
        `${this.baseUrl}/api/v1/chat/conversation?provider=${encodeURIComponent(provider)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      )

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
