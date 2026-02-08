package com.example.cropia.ml

import android.content.Context
import com.example.cropia.data.DetectionResult
import com.example.cropia.data.DiseaseInfo
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.withContext

/**
 * Service for on-device LLM recommendations using SmolLM2-135M.
 * 
 * IMPLEMENTATION STATUS:
 * This service represents the planned on-device LLM integration.
 * SmolLM2-135M was selected through benchmarking (14.99s latency, 101MB).
 * 
 * Current implementation provides simulated responses for demonstration
 * while full native integration is in development.
 * 
 * Production deployment would require:
 * - llama.cpp native library compilation for Android NDK
 * - JNI bindings for Kotlin/Java integration
 * - GGUF model bundled in APK (adds ~101MB)
 * 
 * For thesis documentation: This demonstrates the technical approach
 * and feasibility analysis for on-device LLM deployment on Android.
 */
class SmolLM2Service(private val context: Context) {
    
    suspend fun generateRecommendation(
        result: DetectionResult,
        diseaseInfo: DiseaseInfo
    ): String = withContext(Dispatchers.Default) {
        // Simulate model loading and inference time (~15 seconds as per benchmarks)
        delay(2000) // Reduced for demo purposes
        
        // Generate contextual recommendation based on disease info
        generateContextualRecommendation(result, diseaseInfo)
    }
    
    private fun generateContextualRecommendation(
        result: DetectionResult,
        diseaseInfo: DiseaseInfo
    ): String {
        val confidence = result.confidence
        val confidenceLevel = when {
            confidence >= 90 -> "muy alta"
            confidence >= 75 -> "alta"
            confidence >= 60 -> "moderada"
            else -> "baja"
        }
        
        return when {
            diseaseInfo.name.contains("Tardío", ignoreCase = true) || 
            diseaseInfo.name.contains("Late Blight", ignoreCase = true) -> """
**Evaluación del Diagnóstico**
Se ha detectado Tizón Tardío con confianza $confidenceLevel (${String.format("%.1f", confidence)}%). Esta es una enfermedad crítica que requiere acción inmediata.

**Acciones Inmediatas (HOY)**
1. Aplicar fungicida sistémico (Metalaxil + Mancozeb) antes de 24 horas
2. Remover y destruir plantas severamente infectadas
3. Mejorar drenaje del terreno si hay encharcamiento

**Tratamiento Químico Recomendado**
- Producto: Ridomil Gold MZ 68 WP (Metalaxil 4% + Mancozeb 64%)
- Dosis: 2.5 kg/ha en 400-600 L de agua
- Frecuencia: Cada 7-10 días dependiendo de humedad
- Alternativas: Fitoraz (Propamocarb + Fluopicolide)

**Manejo Cultural**
- Espaciamiento adecuado entre plantas (30-40 cm)
- Evitar riego por aspersión en horas nocturnas
- Rotación de cultivos: no plantar solanáceas por 2 años
- Monitoreo diario de nuevas lesiones

**Prevención Futura**
- Usar variedades resistentes (Canchán, Yungay)
- Sistema de alerta temprana con estaciones meteorológicas
- Fungicidas preventivos en época de lluvias
            """.trimIndent()
            
            diseaseInfo.name.contains("Temprano", ignoreCase = true) || 
            diseaseInfo.name.contains("Early Blight", ignoreCase = true) -> """
**Evaluación del Diagnóstico**
Tizón Temprano detectado con confianza $confidenceLevel (${String.format("%.1f", confidence)}%). Enfermedad manejable si se actúa rápido.

**Acciones Inmediatas (HOY)**
1. Iniciar aplicación de fungicida protectante
2. Remover hojas basales infectadas
3. Verificar nutrición del cultivo (deficiencia de N favorece la enfermedad)

**Tratamiento Químico**
- Producto principal: Mancozeb 80% WP
- Dosis: 2 kg/ha en 400 L de agua
- Frecuencia: Cada 10-14 días
- Alternativa: Chlorothalonil 75% WP (2 kg/ha)
- Rotación: Alternar con Azoxystrobin para evitar resistencia

**Manejo Cultural**
- Fertilización balanceada NPK (evitar exceso de nitrógeno)
- Eliminar residuos de cosecha anterior
- Aporque alto para proteger tubérculos
- Poda de hojas basales para mejorar ventilación

**Medidas Preventivas**
- Aplicar fungicidas preventivos desde 30 días post-siembra
- Usar semilla certificada libre de patógenos
- Rotación con leguminosas o cereales
- Control de malezas que son hospederos alternativos
            """.trimIndent()
            
            else -> """
**Evaluación**
El cultivo se encuentra saludable con confianza $confidenceLevel (${String.format("%.1f", confidence)}%).

**Mantenimiento Preventivo**
1. Continuar con programa de nutrición balanceada
2. Monitoreo semanal de plagas y enfermedades
3. Mantener buenas prácticas de riego

**Recomendaciones Generales**
- Inspección regular de plantas (2-3 veces por semana)
- Aplicar fungicidas preventivos en época de lluvias
- Mantener registros de manejo del cultivo
- Preparar plan de respuesta ante síntomas

**Nutrición Óptima**
- NPK según análisis de suelo
- Calcio y magnesio para fortalecer paredes celulares
- Micronutrientes: Zinc, Boro, Manganeso

**Buenas Prácticas**
- Rotación de cultivos cada 2-3 años
- Uso de variedades mejoradas
- Manejo integrado de plagas (MIP)
- Documentación de todas las aplicaciones
            """.trimIndent()
        }
    }
    
    fun close() {
        // Cleanup would happen here in full implementation
    }
}
