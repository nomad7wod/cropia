# Cropia 🌱

Aplicación Android de detección de plagas en cultivos de papa usando inteligencia artificial.

## Características

- 🔍 **Detección de plagas con IA**: Usa MobileViT-S para identificar enfermedades en tiempo real
- 📊 **Precisión del 97.94%**: Modelo entrenado para detectar Tizón Temprano, Tizón Tardío y plantas saludables
- 💡 **Recomendaciones inteligentes**: Tratamientos y prevención basados en conocimiento experto
- 🤖 **Integración con Gemini AI**: Recomendaciones personalizadas opcionales (requiere API key)
- 📱 **Interfaz intuitiva**: Diseño moderno con Material 3 y Jetpack Compose

## Tecnologías

- **Kotlin** + Jetpack Compose
- **PyTorch Mobile 2.1.0** para inferencia de ML
- **Google Gemini API** para recomendaciones con IA
- **MobileViT-S** como modelo de visión

## Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/nomad7wod/cropia.git
cd cropia
```

### 2. Descargar el modelo de ML

El modelo `mobilevit_s_no_inference_mobile.pt` (20MB) no está incluido en el repositorio.

**Opción A: Descargar desde Google Drive**
- [Descargar modelo](LINK_TO_GOOGLE_DRIVE) (pendiente de subir)
- Colocar en: `app/src/main/assets/models/mobilevit_s_no_inference_mobile.pt`

**Opción B: Entrenar tu propio modelo**
- Usar el notebook incluido: `mobile_deployment_final (1).ipynb`
- Seguir las instrucciones para exportar el modelo

### 3. (Opcional) Configurar Gemini API

Para usar recomendaciones con IA:

1. Obtener API key en: https://makersuite.google.com/app/apikey
2. Abrir: `app/src/main/java/com/example/cropia/screens/DetectionScreen.kt`
3. Reemplazar `"YOUR_GEMINI_API_KEY_HERE"` con tu key (línea ~59)

### 4. Compilar y ejecutar

```bash
./gradlew assembleDebug
```

El APK estará en: `app/build/outputs/apk/debug/app-debug.apk`

## Estructura del Proyecto

```
Cropia/
├── app/src/main/
│   ├── assets/
│   │   ├── models/              # Modelos de ML (*.pt)
│   │   └── test_images/         # Imágenes de prueba
│   ├── java/com/example/cropia/
│   │   ├── screens/             # Pantallas de la app
│   │   ├── components/          # Componentes reutilizables
│   │   ├── navigation/          # Sistema de navegación
│   │   ├── ml/                  # Detección ML y Gemini
│   │   ├── data/                # Modelos de datos
│   │   └── ui/theme/            # Temas y colores
│   └── res/                     # Recursos Android
├── mobile_deployment_final (1).ipynb  # Notebook de entrenamiento
└── deployment_config.json       # Configuración del modelo
```

## Clases Detectadas

1. **Tizón Temprano (Early Blight)** - Severidad moderada
2. **Tizón Tardío (Late Blight)** - Severidad alta
3. **Saludable (Healthy)** - Sin enfermedad

## Uso

1. Abrir la app "Cropia"
2. Navegar a la pestaña "Detectar"
3. Tomar una foto o seleccionar de galería
4. Presionar "Analizar Imagen"
5. Ver resultados y recomendaciones

### Modo IA (Opcional)
- Activar el switch "Recomendaciones con IA"
- Requiere conexión a internet
- Genera recomendaciones personalizadas con Gemini

## Requisitos

- Android 7.0 (API 24) o superior
- ~330MB de espacio libre (incluye modelo ML)
- Cámara (para captura de fotos)
- Internet (solo para modo IA)

## Rendimiento

- **Latencia de inferencia**: ~142ms (MobileViT-S)
- **Tamaño del modelo**: 20MB
- **Tamaño del APK**: ~326MB (incluye PyTorch Mobile)
- **Precisión**: 97.94% en dataset de validación

## Licencia

Este proyecto fue desarrollado como parte de un sistema de detección de plagas para agricultura.

## Autor

Desarrollado por [Tu Nombre]

## Agradecimientos

- Centro Internacional de la Papa (CIP) por el conocimiento experto
- MobileViT architecture por Apple Research
- PyTorch Mobile team
