import { ref, computed } from 'vue'
import type { Message, ChatbotConfig, ModelType } from '@/types/chatbot'
import { DEFAULT_CONFIG } from '@/types/chatbot'
import { chatbotApi } from '@/services/api'

export function useChatbot() {
  const messages = ref<Message[]>([])
  const config = ref<ChatbotConfig>({ ...DEFAULT_CONFIG })
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isServerAvailable = ref(false)

  // Inicializar chat sin mensajes predeterminados
  const initializeChat = async () => {
    messages.value = []
    // Verificar disponibilidad del servidor
    isServerAvailable.value = await chatbotApi.healthCheck()
    if (!isServerAvailable.value) {
      error.value = 'No se puede conectar con el servidor. Asegúrate de que FastAPI esté ejecutándose.'
    }
  }

  // Generar ID único para mensajes
  const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Enviar mensaje
  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }
    messages.value.push(userMessage)

    isLoading.value = true
    error.value = null

    try {
      // Llamada real a la API de FastAPI
      const response = await chatbotApi.sendMessage(
        content.trim(),
        config.value,
        messages.value.slice(0, -1) // Excluir el último mensaje (el que acabamos de agregar)
      )

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
        model: config.value.model,
      }
      messages.value.push(assistantMessage)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al procesar el mensaje'
      console.error('Error:', err)
      
      // Remover el mensaje del usuario si hay error
      messages.value.pop()
    } finally {
      isLoading.value = false
    }
  }

  // Actualizar configuración
  const updateConfig = (newConfig: Partial<ChatbotConfig>) => {
    config.value = { ...config.value, ...newConfig }
  }

  // Cambiar modelo
  const changeModel = (model: ModelType) => {
    config.value.model = model
  }

  // Limpiar chat
  const clearChat = () => {
    messages.value = []
    error.value = null
  }

  // Verificar servidor
  const checkServer = async () => {
    isServerAvailable.value = await chatbotApi.healthCheck()
    return isServerAvailable.value
  }

  // Computed
  const messageCount = computed(() => messages.value.length)
  const lastMessage = computed(() => messages.value[messages.value.length - 1])

  return {
    messages,
    config,
    isLoading,
    error,
    isServerAvailable,
    sendMessage,
    updateConfig,
    changeModel,
    clearChat,
    initializeChat,
    checkServer,
    messageCount,
    lastMessage,
  }
}
