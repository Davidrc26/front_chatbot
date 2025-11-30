# Configuración del Backend (FastAPI en Render)

Para que el frontend en Vercel pueda comunicarse con el backend en Render, necesitas configurar CORS en tu backend FastAPI:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Desarrollo local
        "http://localhost:5174",  # Desarrollo local alternativo
        "https://tu-app.vercel.app",  # Reemplaza con tu URL de Vercel
        "https://*.vercel.app",  # Permite todas las previews de Vercel
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Pasos para desplegar en Vercel:

1. **Conecta tu repositorio en Vercel:**
   - Ve a https://vercel.com
   - Click en "Add New Project"
   - Importa tu repositorio de GitHub

2. **Configura las variables de entorno en Vercel:**
   - En el dashboard de Vercel, ve a Settings > Environment Variables
   - Agrega: `VITE_API_BASE_URL` = `https://backend-chatbot-ja8r.onrender.com`

3. **Deploy automático:**
   - Vercel detectará automáticamente que es un proyecto Vite
   - Usará la configuración de `vercel.json`
   - El build se ejecutará automáticamente

4. **Actualiza el CORS del backend:**
   - Una vez que tengas la URL de Vercel (ej: https://front-chatbot.vercel.app)
   - Actualiza el CORS en el backend para incluir esa URL

## URLs importantes:
- Backend: https://backend-chatbot-ja8r.onrender.com
- Frontend: (se generará al desplegar en Vercel)
