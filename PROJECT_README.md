# 🤖 Chatbot de Inteligencia Artificial

Chatbot interactivo especializado en responder preguntas sobre Inteligencia Artificial, construido con Vue 3, TypeScript y Vite.

## 🌟 Características

- ✅ **Selección de Modelo**: Elige entre LLaMA y Gemini
- ⚙️ **Parámetros Configurables**:
  - Número de documentos (1-20): controla cuántos documentos se recuperan del contexto
  - Reranking: mejora la relevancia de los documentos recuperados
  - Modelo: selecciona entre LLaMA o Gemini
- 💬 **Interfaz de Chat Intuitiva**
- 🔌 **Integración con FastAPI**: conecta con tu backend de IA
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
├── services/          # Servicios de API
│   └── api.ts        # Cliente para comunicación con FastAPI
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

- **LLaMA**: Modelo de Meta AI optimizado para conversaciones sobre IA
- **Gemini**: Modelo de Google AI con capacidades avanzadas

### Parámetros del Modelo

| Parámetro | Rango/Tipo | Descripción |
|-----------|------------|-------------|
| Modelo | llama \| gemini | Selecciona el modelo de IA a utilizar |
| Número de Documentos | 1-20 | Cantidad de documentos a recuperar del contexto |
| Usar Reranking | true \| false | Activa el reordenamiento de documentos por relevancia |

## 🔌 Integración con FastAPI

Este frontend se conecta con un backend de FastAPI. Asegúrate de que tu API esté corriendo en `http://localhost:8000` (o configura la URL en un archivo `.env`).

### Endpoints Requeridos

Tu API debe implementar:

- `POST /chat` - Recibe mensajes y devuelve respuestas
  - Request: `{ message, model, numDocuments, useReranking, conversationHistory }`
  - Response: `{ response, model, documentsUsed, reranking }`
- `GET /health` - Verificar estado del servidor (opcional)
- `GET /models` - Obtener modelos disponibles (opcional)

### Configuración

Si tu API está en otro puerto, crea un archivo `.env`:

```bash
cp .env.example .env
```

Y modifica la URL:

```env
VITE_API_BASE_URL=http://localhost:TU_PUERTO
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
  },
}
```

3. Actualiza el selector en `ModelSelector.vue`
4. Asegúrate de que tu backend FastAPI soporte el nuevo modelo

## 🛠️ Tecnologías

- **Vue 3**: Framework progresivo de JavaScript
- **TypeScript**: Tipado estático
- **Vite**: Build tool ultrarrápido
- **Vue Router**: Enrutamiento
- **Composition API**: Patrón de composición de Vue 3

## 📝 Próximas Características

- [ ] Historial de conversaciones persistente
- [ ] Exportar chat a PDF/Markdown
- [ ] Soporte multiidioma
- [ ] Modo oscuro
- [ ] Visualización de documentos recuperados
- [ ] Streaming de respuestas en tiempo real
- [ ] Guardar configuraciones personalizadas
- [ ] Métricas y analytics

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

---

Desarrollado con ❤️ usando Vue 3 + TypeScript
