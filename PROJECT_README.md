# 🤖 Chatbot de Inteligencia Artificial

Chatbot interactivo especializado en responder preguntas sobre Inteligencia Artificial, construido con Vue 3, TypeScript y Vite.

## 🌟 Características

- ✅ **RAG (Retrieval Augmented Generation)**: Búsqueda en documentos para respuestas contextualizadas
- ⚙️ **Parámetros Configurables**:
  - Usar RAG: activa/desactiva la búsqueda en documentos
  - Número de documentos (1-20): controla cuántos documentos se recuperan
  - Reranking: mejora la relevancia de los documentos recuperados
- 💬 **Interfaz de Chat Intuitiva**
- 🔌 **Integración con FastAPI**: conecta con tu backend de IA
- 📚 **Visualización de Fuentes**: muestra los documentos consultados
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

### Parámetros Disponibles

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| Usar RAG | boolean | Activa la búsqueda en documentos (Retrieval Augmented Generation) |
| Número de Documentos | 1-20 | Cantidad de documentos a recuperar del contexto (solo si RAG está activo) |
| Usar Reranking | boolean | Reordena documentos por relevancia para mejorar calidad (solo si RAG está activo) |

### Valores por Defecto

```typescript
{
  useRag: true,
  nResults: 3,
  useRerank: true
}
```

## 🔌 Integración con FastAPI

Este frontend se conecta con un backend de FastAPI. Asegúrate de que tu API esté corriendo en `http://localhost:8000` (o configura la URL en un archivo `.env`).

### Endpoints Requeridos

**POST /chat** - Endpoint principal

Request:
```json
{
  "message": "¿Qué es la inteligencia artificial?",
  "user_id": "user-123456",
  "use_rag": true,
  "n_results": 3,
  "use_rerank": true
}
```

Response:
```json
{
  "response": "La inteligencia artificial es...",
  "success": true,
  "sources": ["documento 1...", "documento 2..."],
  "metadatas": [{...}, {...}],
  "found_documents": true,
  "reranked": true
}
```

**GET /health** - Verificación de disponibilidad (opcional)

Response:
```json
{
  "status": "healthy"
}
```

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

Edita `src/assets/main.css`:

```css
:root {
  --primary-color: #3498db;
  --secondary-color: #667eea;
  /* ... */
}
```

### Ajustar Rango de Documentos

Edita `src/types/chatbot.ts`:

```typescript
export const CONFIG_INFO = {
  // ...
  nResults: {
    label: 'Número de Documentos',
    description: 'Cantidad de documentos a recuperar del contexto',
    min: 1,
    max: 20, // Cambia este valor
  },
  // ...
}
```

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
