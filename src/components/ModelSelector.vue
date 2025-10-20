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
        <label for="temperature">
          Temperature: <span class="value">{{ modelValue.temperature }}</span>
        </label>
        <input
          id="temperature"
          type="range"
          min="0"
          max="2"
          step="0.1"
          :value="modelValue.temperature"
          @input="updateParameter('temperature', $event)"
        />
        <small>Controla la creatividad de las respuestas (0 = conservador, 2 = creativo)</small>
      </div>

      <div class="parameter-group">
        <label for="max-tokens">
          Max Tokens: <span class="value">{{ modelValue.maxTokens }}</span>
        </label>
        <input
          id="max-tokens"
          type="range"
          min="256"
          :max="modelInfo[modelValue.model].maxTokens"
          step="256"
          :value="modelValue.maxTokens"
          @input="updateParameter('maxTokens', $event)"
        />
        <small>Longitud máxima de la respuesta</small>
      </div>

      <div class="parameter-group">
        <label for="top-p">
          Top P: <span class="value">{{ modelValue.topP }}</span>
        </label>
        <input
          id="top-p"
          type="range"
          min="0"
          max="1"
          step="0.05"
          :value="modelValue.topP"
          @input="updateParameter('topP', $event)"
        />
        <small>Nucleus sampling - diversidad de tokens (0.1 = enfocado, 1.0 = diverso)</small>
      </div>

      <div class="parameter-group">
        <label for="top-k">
          Top K: <span class="value">{{ modelValue.topK }}</span>
        </label>
        <input
          id="top-k"
          type="range"
          min="1"
          max="100"
          step="1"
          :value="modelValue.topK"
          @input="updateParameter('topK', $event)"
        />
        <small>Número de tokens candidatos a considerar</small>
      </div>

      <div class="parameter-group">
        <label for="presence-penalty">
          Presence Penalty: <span class="value">{{ modelValue.presencePenalty }}</span>
        </label>
        <input
          id="presence-penalty"
          type="range"
          min="-2"
          max="2"
          step="0.1"
          :value="modelValue.presencePenalty"
          @input="updateParameter('presencePenalty', $event)"
        />
        <small>Penaliza temas ya mencionados</small>
      </div>

      <div class="parameter-group">
        <label for="frequency-penalty">
          Frequency Penalty: <span class="value">{{ modelValue.frequencyPenalty }}</span>
        </label>
        <input
          id="frequency-penalty"
          type="range"
          min="-2"
          max="2"
          step="0.1"
          :value="modelValue.frequencyPenalty"
          @input="updateParameter('frequencyPenalty', $event)"
        />
        <small>Penaliza repeticiones frecuentes</small>
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
  const value = param === 'model' ? target.value : parseFloat(target.value)
  const newConfig = { ...props.modelValue, [param]: value }
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
