<template>
  <div class="model-selector">
    <h3>Configuración del Modelo</h3>

    <!-- Selector de Modelo -->
    <div class="config-section">
      <label for="model-select">Modelo de IA:</label>
      <select
        id="model-select"
        :value="modelValue.model"
        @change="updateModel($event)"
        class="model-select"
      >
        <option value="llama">LLaMA</option>
        <option value="gemini">Gemini</option>
      </select>
      <p class="model-description">
        {{ modelInfo[modelValue.model].description }}
      </p>
    </div>

    <!-- Parámetros del Modelo -->
    <div class="parameters">
      <div class="parameter-group">
        <label for="num-documents">
          Número de Documentos: <span class="value">{{ modelValue.numDocuments }}</span>
        </label>
        <input
          id="num-documents"
          type="range"
          min="1"
          max="20"
          step="1"
          :value="modelValue.numDocuments"
          @input="updateParameter('numDocuments', $event)"
        />
        <small>Cantidad de documentos a recuperar del contexto</small>
      </div>

      <div class="parameter-group">
        <label for="use-reranking" class="checkbox-label">
          <input
            id="use-reranking"
            type="checkbox"
            :checked="modelValue.useReranking"
            @change="updateCheckbox('useReranking', $event)"
            class="checkbox-input"
          />
          <span class="checkbox-text">Usar Reranking</span>
        </label>
        <small>Mejora la relevancia de los documentos recuperados usando reordenamiento</small>
      </div>
    </div>

    <button @click="resetToDefaults" class="reset-btn">Restablecer valores por defecto</button>
  </div>
</template>

<script setup lang="ts">
import type { ChatbotConfig, ModelType } from '@/types/chatbot'
import { MODEL_INFO, DEFAULT_CONFIG } from '@/types/chatbot'

const props = defineProps<{
  modelValue: ChatbotConfig
}>()

const emit = defineEmits<{
  'update:modelValue': [config: ChatbotConfig]
}>()

const updateModel = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const newConfig = { ...props.modelValue, model: target.value as ModelType }
  emit('update:modelValue', newConfig)
}

const updateParameter = (param: keyof ChatbotConfig, event: Event) => {
  const target = event.target as HTMLInputElement
  let value: string | number | boolean
  
  if (param === 'model') {
    value = target.value
  } else if (param === 'useReranking') {
    value = target.checked
  } else {
    value = parseInt(target.value, 10)
  }
  
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

const modelInfo = MODEL_INFO
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
</style>
