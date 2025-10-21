<template>
  <div :class="['message', `message-${message.role}`]">
    <div class="message-header">
      <span class="message-role">
        {{ roleLabel }}
      </span>
      <span class="message-time">{{ formattedTime }}</span>
    </div>
    <div class="message-content">
      {{ message.content }}
    </div>
    
    <!-- Mostrar fuentes si existen -->
    <div v-if="message.sources && message.sources.length > 0" class="message-sources">
      <details>
        <summary>📚 Fuentes consultadas ({{ message.sources.length }})</summary>
        <div class="sources-list">
          <div v-for="(source, index) in message.sources" :key="index" class="source-item">
            <strong>Documento {{ index + 1 }}:</strong>
            <p>{{ truncateSource(source) }}</p>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Message } from '@/types/chatbot'

const props = defineProps<{
  message: Message
}>()

const roleLabel = computed(() => {
  const labels: Record<string, string> = {
    user: '👤 Tú',
    assistant: '🤖 Asistente',
    system: '⚙️ Sistema',
  }
  return labels[props.message.role] || props.message.role
})

const formattedTime = computed(() => {
  return new Date(props.message.timestamp).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  })
})

const truncateSource = (source: string, maxLength: number = 300): string => {
  if (source.length <= maxLength) return source
  return source.substring(0, maxLength) + '...'
}
</script>

<style scoped>
.message {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-user {
  background: #3498db;
  color: white;
  margin-left: 2rem;
  align-self: flex-end;
}

.message-assistant {
  background: #ecf0f1;
  color: #2c3e50;
  margin-right: 2rem;
  align-self: flex-start;
}

.message-system {
  background: #f39c12;
  color: white;
  text-align: center;
  font-style: italic;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.message-role {
  font-weight: 700;
}

.message-model {
  background: rgba(0, 0, 0, 0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 600;
}

.message-time {
  margin-left: auto;
  opacity: 0.7;
  font-size: 0.75rem;
}

.message-content {
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.message-user .message-content {
  font-weight: 500;
}

.message-sources {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.message-assistant .message-sources {
  border-top-color: rgba(0, 0, 0, 0.1);
}

.message-sources details {
  cursor: pointer;
}

.message-sources summary {
  font-size: 0.85rem;
  font-weight: 600;
  color: #2c3e50;
  user-select: none;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background 0.2s;
}

.message-sources summary:hover {
  background: rgba(0, 0, 0, 0.05);
}

.sources-list {
  margin-top: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
}

.source-item {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  font-size: 0.85rem;
}

.source-item strong {
  display: block;
  margin-bottom: 0.25rem;
  color: #2c3e50;
}

.source-item p {
  margin: 0;
  color: #555;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}

.sources-list::-webkit-scrollbar {
  width: 6px;
}

.sources-list::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.sources-list::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.sources-list::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
</style>
