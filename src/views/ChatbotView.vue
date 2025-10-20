<template>
  <div class="chatbot-view">
    <div class="sidebar">
      <ModelSelector v-model="config" />
    </div>

    <div class="main-content">
      <ChatWindow
        :messages="messages"
        :is-loading="isLoading"
        :error="error"
        :message-count="messageCount"
        @send-message="handleSendMessage"
        @clear="handleClear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useChatbot } from '@/composables/useChatbot'
import ModelSelector from '@/components/ModelSelector.vue'
import ChatWindow from '@/components/ChatWindow.vue'

const {
  messages,
  config,
  isLoading,
  error,
  sendMessage,
  clearChat,
  initializeChat,
  messageCount,
} = useChatbot()

const handleSendMessage = async (message: string) => {
  await sendMessage(message)
}

const handleClear = () => {
  if (confirm('¿Estás seguro de que quieres limpiar el chat?')) {
    clearChat()
  }
}

onMounted(() => {
  initializeChat()
})
</script>

<style scoped>
.chatbot-view {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 2rem;
  height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  box-sizing: border-box;
}

.sidebar {
  overflow-y: auto;
}

.main-content {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

/* Scrollbar para sidebar */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #bdc3c7;
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #95a5a6;
}

/* Responsive */
@media (max-width: 1024px) {
  .chatbot-view {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    padding: 1rem;
    gap: 1rem;
  }

  .sidebar {
    max-height: 400px;
  }
}
</style>
