<template>
  <div class="model-selector">
    <h3>⚙️ Configuración del Chatbot</h3>

    <!-- Parámetros del Modelo -->
    <div class="parameters">
      <div class="parameter-group">
        <label for="use-rag" class="checkbox-label">
          <input
            id="use-rag"
            type="checkbox"
            :checked="modelValue.useRag"
            @change="updateCheckbox('useRag', $event)"
            class="checkbox-input"
          />
          <span class="checkbox-text">{{ configInfo.useRag.label }}</span>
        </label>
        <small>{{ configInfo.useRag.description }}</small>
      </div>

      <div class="parameter-group" :class="{ disabled: !modelValue.useRag }">
        <label for="n-results">
          {{ configInfo.nResults.label }}: <span class="value">{{ modelValue.nResults }}</span>
        </label>
        <input
          id="n-results"
          type="range"
          :min="configInfo.nResults.min"
          :max="configInfo.nResults.max"
          step="1"
          :value="modelValue.nResults"
          :disabled="!modelValue.useRag"
          @input="updateParameter('nResults', $event)"
        />
        <small>{{ configInfo.nResults.description }}</small>
      </div>

      <div class="parameter-group" :class="{ disabled: !modelValue.useRag }">
        <label for="use-rerank" class="checkbox-label">
          <input
            id="use-rerank"
            type="checkbox"
            :checked="modelValue.useRerank"
            :disabled="!modelValue.useRag"
            @change="updateCheckbox('useRerank', $event)"
            class="checkbox-input"
          />
          <span class="checkbox-text">{{ configInfo.useRerank.label }}</span>
        </label>
        <small>{{ configInfo.useRerank.description }}</small>
      </div>
    </div>

    <button @click="resetToDefaults" class="reset-btn">Restablecer valores por defecto</button>

    <div class="info-section">
      <h4>ℹ️ Información</h4>
      <div class="info-item">
        <strong>RAG:</strong> Retrieval Augmented Generation - busca en documentos para dar respuestas más precisas
      </div>
      <div class="info-item">
        <strong>Reranking:</strong> Reordena los documentos encontrados para mostrar los más relevantes primero
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatbotConfig } from '@/types/chatbot'
import { CONFIG_INFO, DEFAULT_CONFIG } from '@/types/chatbot'

const props = defineProps<{
  modelValue: ChatbotConfig
}>()

const emit = defineEmits<{
  'update:modelValue': [config: ChatbotConfig]
}>()

const updateParameter = (param: keyof ChatbotConfig, event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value, 10)
  const newConfig = { ...props.modelValue, [param]: value }
  emit('update:modelValue', newConfig)
}

const updateCheckbox = (param: keyof ChatbotConfig, event: Event) => {
  const target = event.target as HTMLInputElement
  const newConfig = { ...props.modelValue, [param]: target.checked }
  emit('update:modelValue', newConfig)
}

const resetToDefaults = () => {
  emit('update:modelValue', { ...DEFAULT_CONFIG })
}

const configInfo = CONFIG_INFO
</script>

<style scoped>
.model-selector {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  max-width: 400px;
}

h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-size: 1.25rem;
}

.config-section {
  margin-bottom: 2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #34495e;
  font-size: 0.95rem;
}

.model-select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s;
}

.model-select:hover {
  border-color: #3498db;
}

.model-select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.model-description {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #7f8c8d;
  font-style: italic;
}

.parameters {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.parameter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: opacity 0.3s;
}

.parameter-group.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.parameter-group label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.value {
  background: #3498db;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 700;
}

input[type='range'] {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #dee2e6;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #3498db;
  cursor: pointer;
  transition: background 0.3s;
}

input[type='range']::-webkit-slider-thumb:hover {
  background: #2980b9;
}

input[type='range']::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #3498db;
  cursor: pointer;
  border: none;
  transition: background 0.3s;
}

input[type='range']::-moz-range-thumb:hover {
  background: #2980b9;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-weight: 600;
}

.checkbox-input {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #3498db;
}

.checkbox-text {
  flex: 1;
}

small {
  color: #7f8c8d;
  font-size: 0.75rem;
  line-height: 1.3;
}

.reset-btn {
  margin-top: 1rem;
  width: 100%;
  padding: 0.75rem;
  background: #95a5a6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.reset-btn:hover {
  background: #7f8c8d;
}

.reset-btn:active {
  transform: translateY(1px);
}

.info-section {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #e8f4f8;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.info-section h4 {
  margin: 0 0 0.75rem 0;
  color: #2c3e50;
  font-size: 0.95rem;
}

.info-item {
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  line-height: 1.4;
  color: #34495e;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item strong {
  color: #2c3e50;
  font-weight: 600;
}
</style>
