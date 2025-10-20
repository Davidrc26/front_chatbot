import { ref, computed } from 'vue'
import type { Message, ChatbotConfig, ModelType } from '@/types/chatbot'
import { DEFAULT_CONFIG } from '@/types/chatbot'

export function useChatbot() {
  const messages = ref<Message[]>([])
  const config = ref<ChatbotConfig>({ ...DEFAULT_CONFIG })
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Agregar mensaje del sistema inicial
  const initializeChat = () => {
    const systemMessage: Message = {
      id: generateId(),
      role: 'system',
      content: 'Hola! Soy un asistente especializado en Inteligencia Artificial. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
      model: config.value.model,
    }
    messages.value = [systemMessage]
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
      // TODO: Aquí irá la llamada real a la API
      // Por ahora simulamos una respuesta
      const response = await simulateApiCall(content, config.value)

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        model: config.value.model,
      }
      messages.value.push(assistantMessage)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al procesar el mensaje'
      console.error('Error:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Simulación de llamada API (reemplazar con API real)
  const simulateApiCall = async (
    userMessage: string,
    currentConfig: ChatbotConfig
  ): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses: string[] = [
          `[${currentConfig.model.toUpperCase()}] Basándome en tu pregunta sobre "${userMessage}", la Inteligencia Artificial es un campo fascinante que abarca múltiples disciplinas...`,
          `[${currentConfig.model.toUpperCase()}] Interesante pregunta. En el contexto de IA, podemos considerar varios aspectos importantes...`,
          `[${currentConfig.model.toUpperCase()}] Según mi conocimiento sobre IA, te puedo decir que...`,
        ]
        const randomIndex = Math.floor(Math.random() * responses.length)
        resolve(responses[randomIndex]!)
      }, 1000 + Math.random() * 1000)
    })
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
    initializeChat()
  }

  // Computed
  const messageCount = computed(() => messages.value.length)
  const lastMessage = computed(() => messages.value[messages.value.length - 1])

  return {
    messages,
    config,
    isLoading,
    error,
    sendMessage,
    updateConfig,
    changeModel,
    clearChat,
    initializeChat,
    messageCount,
    lastMessage,
  }
}
