<template>
  <div class="chat-window">
    <div class="chat-header">
      <h2>💬 Chatbot de IA</h2>
      <div class="chat-info">
        <span class="message-count">{{ messageCount }} mensajes</span>
        <button @click="$emit('clear')" class="clear-btn" title="Limpiar chat">
          🗑️ Limpiar
        </button>
      </div>
    </div>

    <div ref="messagesContainer" class="messages-container">
      <div v-if="messages.length === 0" class="empty-state">
        <h3>🤖 Chatbot de IA</h3>
        <p>Haz una pregunta sobre Inteligencia Artificial para comenzar la conversación</p>
        <div class="empty-hints">
          <small>💡 Configura el modelo y parámetros en el panel lateral</small>
        </div>
      </div>

      <ChatMessage v-for="message in messages" :key="message.id" :message="message" />

      <div v-if="isLoading" class="loading-message">
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span class="loading-text">El asistente está pensando...</span>
      </div>

      <div v-if="error" class="error-message">
        <strong>❌ Error:</strong> {{ error }}
      </div>
    </div>

    <ChatInput :disabled="isLoading" @submit="$emit('sendMessage', $event)" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { Message } from '@/types/chatbot'
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'

defineProps<{
  messages: Message[]
  isLoading: boolean
  error: string | null
  messageCount: number
}>()

defineEmits<{
  sendMessage: [message: string]
  clear: []
}>()

const messagesContainer = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

watch(
  () => messagesContainer.value,
  () => {
    scrollToBottom()
  },
  { flush: 'post' }
)

// Auto-scroll cuando hay nuevos mensajes
defineExpose({ scrollToBottom })
</script>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chat-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.chat-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.message-count {
  font-size: 0.9rem;
  opacity: 0.9;
}

.clear-btn {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s;
}

.clear-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: #f8f9fa;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #7f8c8d;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.empty-state p {
  font-size: 1rem;
}

.empty-hints {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 8px;
}

.empty-hints small {
  color: #3498db;
  font-size: 0.9rem;
}

.loading-message {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #ecf0f1;
  border-radius: 12px;
  margin-right: 2rem;
}

.loading-dots {
  display: flex;
  gap: 0.5rem;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  background: #3498db;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.loading-text {
  color: #7f8c8d;
  font-style: italic;
}

.error-message {
  padding: 1rem;
  background: #e74c3c;
  color: white;
  border-radius: 12px;
  margin: 0 2rem;
}

/* Scrollbar personalizado */
.messages-container::-webkit-scrollbar {
  width: 8px;
}

.messages-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.messages-container::-webkit-scrollbar-thumb {
  background: #bdc3c7;
  border-radius: 4px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: #95a5a6;
}
</style>
