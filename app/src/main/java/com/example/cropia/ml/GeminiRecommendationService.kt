package com.example.cropia.ml

import com.example.cropia.data.DetectionResult
import com.example.cropia.data.DiseaseInfo
import com.google.ai.client.generativeai.GenerativeModel
import com.google.ai.client.generativeai.type.generationConfig
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class GeminiRecommendationService(private val apiKey: String) {
    
    private val model = GenerativeModel(
        modelName = "gemini-pro",
        apiKey = apiKey,
        generationConfig = generationConfig {
            temperature = 0.7f
            topK = 40
            topP = 0.95f
            maxOutputTokens = 500
        }
    )
    
    suspend fun generateRecommendation(
        result: DetectionResult,
        diseaseInfo: DiseaseInfo
    ): String = withContext(Dispatchers.IO) {
        
        val prompt = """
Eres un agrónomo experto del Centro Internacional de la Papa (CIP).

DIAGNÓSTICO:
- Enfermedad: ${diseaseInfo.name}
- Confianza del modelo: ${(result.confidence * 100).toInt()}%
- Severidad: ${diseaseInfo.severity}

SÍNTOMAS DETECTADOS:
${diseaseInfo.symptoms.joinToString("\n") { "• $it" }}

INSTRUCCIONES:
Genera una recomendación técnica clara y práctica con las siguientes secciones:

1. **Situación Actual**: Breve evaluación del estado del cultivo
2. **Acciones Inmediatas**: Qué hacer HOY (máximo 3 acciones)
3. **Tratamiento Químico**: Productos específicos y dosis recomendadas
4. **Prácticas Culturales**: Manejo a mediano plazo

Usa lenguaje simple y directo. Las recomendaciones deben ser específicas para cultivos de papa en Perú.
Máximo 300 palabras.
        """.trimIndent()
        
        try {
            val response = model.generateContent(prompt)
            response.text ?: "No se pudo generar recomendación con IA."
        } catch (e: Exception) {
            throw Exception("Error al consultar Gemini API: ${e.message}")
        }
    }
}
