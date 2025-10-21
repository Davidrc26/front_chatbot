# 📝 Estado del Proyecto - Frontend Chatbot

## ✅ Archivos del Frontend (Limpios)

### 📂 Estructura del Proyecto

```
front_chatbot/
├── src/
│   ├── components/
│   │   ├── ChatInput.vue          # Input de mensajes
│   │   ├── ChatMessage.vue        # Componente de mensaje
│   │   ├── ChatWindow.vue         # Ventana principal del chat
│   │   └── ModelSelector.vue      # Selector de modelo y parámetros
│   ├── composables/
│   │   └── useChatbot.ts         # Lógica del chatbot con integración API
│   ├── services/
│   │   └── api.ts                # Cliente para comunicación con FastAPI
│   ├── types/
│   │   └── chatbot.ts            # Tipos TypeScript
│   ├── views/
│   │   └── ChatbotView.vue       # Vista principal
│   ├── router/
│   │   └── index.ts              # Configuración de rutas
│   ├── assets/
│   │   └── main.css              # Estilos globales
│   ├── App.vue                    # Componente raíz
│   └── main.ts                    # Punto de entrada
├── .env.example                   # Ejemplo de variables de entorno
├── PROJECT_README.md              # Documentación del proyecto
└── package.json                   # Dependencias
```

## 🎯 Configuración Actual

### Parámetros del Chatbot

```typescript
interface ChatbotConfig {
  useRag: boolean      // Activar búsqueda en documentos (RAG)
  nResults: number     // 1-20 documentos a recuperar
  useRerank: boolean   // Activar/desactivar reranking
}
```

### Valores por Defecto

```typescript
{
  useRag: true,
  nResults: 3,
  useRerank: true
}
```

## 🔌 Integración con Backend

### URL de la API

- **Por defecto:** `http://localhost:8000`
- **Configurable:** Crea un archivo `.env` basado en `.env.example`

### Endpoints que Consume

1. **POST /chat** (Principal)
   ```json
   // Request
   {
     "message": "string",
     "user_id": "string (opcional)",
     "use_rag": true | false,
     "n_results": 1-20,
     "use_rerank": true | false
   }
   
   // Response
   {
     "response": "string",
     "success": boolean,
     "sources": ["string"],
     "metadatas": [{...}],
     "found_documents": boolean,
     "reranked": boolean
   }
   ```

2. **GET /health** (Opcional)
   ```json
   { "status": "healthy" }
   ```

## 🚀 Uso

### Desarrollo

```bash
npm run dev
# Servidor en http://localhost:5173
```

### Build

```bash
npm run build
npm run preview
```

## ✨ Características Implementadas

- ✅ Chat sin mensajes predeterminados
- ✅ Integración real con API FastAPI
- ✅ Toggle para activar/desactivar RAG
- ✅ Control de número de documentos (1-20)
- ✅ Toggle de reranking (se desactiva si RAG está off)
- ✅ Visualización de fuentes consultadas en cada respuesta
- ✅ ID de usuario único por sesión
- ✅ Manejo de errores
- ✅ Verificación de disponibilidad del servidor
- ✅ Auto-scroll en mensajes
- ✅ Diseño responsivo
- ✅ Sección informativa sobre RAG y Reranking

## 📦 Dependencias

```json
{
  "vue": "^3.5.22",
  "vue-router": "^4.5.1"
}
```

## 🔧 Archivos Clave

### `src/services/api.ts`
Cliente para comunicación con FastAPI. Aquí puedes cambiar la URL base si es necesario.

### `src/types/chatbot.ts`
Define todos los tipos e interfaces. Modifica aquí si necesitas agregar nuevos parámetros o cambiar rangos.

### `src/components/ModelSelector.vue`
UI para configurar RAG, documentos y reranking. Los controles de documentos y reranking se deshabilitan automáticamente si RAG está desactivado.

### `src/components/ChatMessage.vue`
Muestra mensajes con soporte para visualizar fuentes consultadas. Las fuentes se muestran en un accordion expandible.

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

### Cambiar Rango de Documentos

Edita `src/types/chatbot.ts`:

```typescript
export const CONFIG_INFO = {
  nResults: {
    min: 1,
    max: 20, // Cambia este valor según necesites
  },
}
```

### Ver User ID de la Sesión

El frontend genera automáticamente un `user_id` único por sesión. Puedes accederlo:

```typescript
const { getUserId } = useChatbot()
console.log(getUserId()) // user-1234567890-abc123
```

### Cambiar URL del Backend

Crea `.env`:

```env
VITE_API_BASE_URL=http://tu-servidor:puerto
```

## ⚠️ Notas Importantes

- El frontend está **100% listo** para conectarse con tu backend FastAPI
- **No hay archivos de ejemplo de Python** en este proyecto
- La comunicación con el backend se maneja en `src/services/api.ts`
- El frontend verifica automáticamente la disponibilidad del servidor cada 30 segundos

## 🔜 Próximos Pasos

1. Asegúrate de que tu backend FastAPI esté corriendo
2. Verifica que CORS esté configurado en tu backend
3. Abre `http://localhost:5173` y prueba el chatbot
4. Personaliza según tus necesidades

---

**Estado:** ✅ Proyecto limpio y listo para producción
**Servidor:** 🟢 Corriendo en http://localhost:5173
