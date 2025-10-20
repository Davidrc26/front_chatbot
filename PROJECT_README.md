# 🤖 Chatbot de Inteligencia Artificial

Chatbot interactivo especializado en responder preguntas sobre Inteligencia Artificial, construido con Vue 3, TypeScript y Vite.

## 🌟 Características

- ✅ **Selección de Modelo**: Elige entre LLaMA y Gemini
- ⚙️ **Parámetros Configurables**:
  - Temperature (creatividad)
  - Max Tokens (longitud de respuesta)
  - Top P y Top K (diversidad)
  - Presence/Frequency Penalty (repetición)
- 💬 **Interfaz de Chat Intuitiva**
- 🎨 **Diseño Moderno y Responsivo**
- 📱 **Adaptable a dispositivos móviles**

## 🚀 Estructura del Proyecto

```
src/
├── components/          # Componentes Vue reutilizables
│   ├── ChatInput.vue   # Input para enviar mensajes
│   ├── ChatMessage.vue # Mensaje individual
│   ├── ChatWindow.vue  # Ventana principal del chat
│   └── ModelSelector.vue # Selector de modelo y parámetros
├── composables/        # Lógica reutilizable (Composition API)
│   └── useChatbot.ts  # Hook principal del chatbot
├── types/             # Definiciones TypeScript
│   └── chatbot.ts    # Tipos e interfaces
├── views/            # Vistas/Páginas
│   └── ChatbotView.vue # Vista principal
├── router/           # Configuración de rutas
│   └── index.ts
├── assets/          # Recursos estáticos
│   └── main.css    # Estilos globales
├── App.vue         # Componente raíz
└── main.ts        # Punto de entrada

```

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 🔧 Configuración

### Modelos Disponibles

- **LLaMA**: Modelo de Meta AI optimizado para conversaciones
- **Gemini**: Modelo de Google AI con capacidades multimodales

### Parámetros del Modelo

| Parámetro | Rango | Descripción |
|-----------|-------|-------------|
| Temperature | 0-2 | Controla la creatividad (0 = conservador, 2 = creativo) |
| Max Tokens | 256-8192 | Longitud máxima de la respuesta |
| Top P | 0-1 | Nucleus sampling - diversidad de tokens |
| Top K | 1-100 | Número de tokens candidatos |
| Presence Penalty | -2 a 2 | Penaliza temas repetidos |
| Frequency Penalty | -2 a 2 | Penaliza palabras frecuentes |

## 🔌 Integración con API

Actualmente el chatbot usa respuestas simuladas. Para conectar con una API real, modifica la función `simulateApiCall` en `src/composables/useChatbot.ts`:

```typescript
// Reemplazar esta función:
const simulateApiCall = async (
  userMessage: string,
  currentConfig: ChatbotConfig
): Promise<string> => {
  // TODO: Implementar llamada real a la API
  const response = await fetch('TU_API_ENDPOINT', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: userMessage,
      config: currentConfig,
    }),
  })
  
  const data = await response.json()
  return data.message
}
```

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `src/assets/main.css`:

```css
:root {
  --primary-color: #3498db;
  --secondary-color: #667eea;
  /* ... más colores */
}
```

### Agregar Nuevos Modelos

1. Actualiza el tipo `ModelType` en `src/types/chatbot.ts`:
```typescript
export type ModelType = 'llama' | 'gemini' | 'nuevoModelo'
```

2. Agrega la información del modelo en `MODEL_INFO`:
```typescript
export const MODEL_INFO = {
  // ...modelos existentes
  nuevoModelo: {
    name: 'Nuevo Modelo',
    description: 'Descripción del nuevo modelo',
    maxTokens: 4096,
  },
}
```

3. Actualiza el selector en `ModelSelector.vue`

## 🛠️ Tecnologías

- **Vue 3**: Framework progresivo de JavaScript
- **TypeScript**: Tipado estático
- **Vite**: Build tool ultrarrápido
- **Vue Router**: Enrutamiento
- **Composition API**: Patrón de composición de Vue 3

## 📝 Próximas Características

- [ ] Historial de conversaciones
- [ ] Exportar chat a PDF/Markdown
- [ ] Soporte multiidioma
- [ ] Modo oscuro
- [ ] Análisis de sentimientos
- [ ] Integración con APIs reales (OpenAI, Anthropic, etc.)
- [ ] Streaming de respuestas
- [ ] Guardar configuraciones personalizadas

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

---

Desarrollado con ❤️ usando Vue 3 + TypeScript
