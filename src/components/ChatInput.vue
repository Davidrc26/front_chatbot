<template>
  <div class="chat-input-container">
    <form @submit.prevent="handleSubmit" class="chat-input-form">
      <textarea
        ref="textareaRef"
        v-model="inputMessage"
        :disabled="disabled"
        :placeholder="placeholder"
        @keydown.enter.exact.prevent="handleSubmit"
        @keydown.enter.shift.exact="handleNewLine"
        class="chat-input"
        rows="1"
      />
      <button type="submit" :disabled="disabled || !inputMessage.trim()" class="send-button">
        <span v-if="!disabled">{{ buttonText }}</span>
        <span v-else class="loading-spinner">⏳</span>
      </button>
    </form>
    <div class="input-hint">
      <small>Presiona Enter para enviar • Shift + Enter para nueva línea</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    placeholder?: string
    buttonText?: string
  }>(),
  {
    disabled: false,
    placeholder: 'Escribe tu pregunta sobre IA...',
    buttonText: 'Enviar',
  }
)

const emit = defineEmits<{
  submit: [message: string]
}>()

const inputMessage = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const handleSubmit = () => {
  if (!inputMessage.value.trim() || props.disabled) return

  emit('submit', inputMessage.value)
  inputMessage.value = ''
  resetTextareaHeight()
}

const handleNewLine = () => {
  inputMessage.value += '\n'
}

const resetTextareaHeight = () => {
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
    }
  })
}

// Auto-resize textarea
watch(inputMessage, () => {
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
      textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
    }
  })
})
</script>

<style scoped>
.chat-input-container {
  padding: 1rem;
  background: white;
  border-top: 1px solid #dee2e6;
}

.chat-input-form {
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
}

.chat-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #dee2e6;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  resize: none;
  max-height: 150px;
  overflow-y: auto;
  transition: border-color 0.3s;
}

.chat-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.chat-input:disabled {
  background: #f8f9fa;
  cursor: not-allowed;
  opacity: 0.6;
}

.send-button {
  padding: 0.75rem 1.5rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.send-button:hover:not(:disabled) {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.send-button:active:not(:disabled) {
  transform: translateY(0);
}

.send-button:disabled {
  background: #95a5a6;
  cursor: not-allowed;
  opacity: 0.6;
}

.loading-spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.input-hint {
  margin-top: 0.5rem;
  text-align: center;
  color: #7f8c8d;
}

.input-hint small {
  font-size: 0.75rem;
}
</style>
