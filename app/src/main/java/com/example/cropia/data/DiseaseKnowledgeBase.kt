package com.example.cropia.data

import androidx.compose.ui.graphics.Color

object DiseaseKnowledgeBase {
    
    fun getDiseaseInfo(className: String): DiseaseInfo {
        return when (className) {
            "Early Blight", "Early" -> earlyBlightInfo()
            "Late Blight", "Late" -> lateBlightInfo()
            "Healthy" -> healthyInfo()
            else -> unknownInfo()
        }
    }
    
    private fun earlyBlightInfo() = DiseaseInfo(
        name = "Tizón Temprano (Early Blight)",
        severity = "MODERADO ⚠️",
        severityColor = Color(0xFFEA580C), // Orange600
        symptoms = listOf(
            "Manchas circulares con anillos concéntricos",
            "Aparecen primero en hojas inferiores",
            "Color café oscuro a negro",
            "Puede afectar tallos y tubérculos"
        ),
        treatment = listOf(
            "🔹 Aplicar fungicida sistémico (Mancozeb o Clorotalonil)",
            "🔹 Remover hojas infectadas y destruirlas (quemar o enterrar)",
            "🔹 Evitar riego por aspersión, preferir riego por goteo",
            "🔹 Aumentar espaciamiento entre plantas para mejor ventilación",
            "🔹 Aplicar cada 7-10 días según severidad",
            "🔹 Alternar fungicidas para evitar resistencia"
        ),
        prevention = listOf(
            "✓ Rotación de cultivos (mínimo 2-3 años)",
            "✓ Desinfectar herramientas entre usos",
            "✓ Aplicar fungicida preventivo en periodos húmedos",
            "✓ Eliminar restos de cosecha anterior",
            "✓ Mantener nutrición balanceada (evitar exceso de nitrógeno)",
            "✓ Monitoreo semanal del cultivo"
        )
    )
    
    private fun lateBlightInfo() = DiseaseInfo(
        name = "Tizón Tardío (Late Blight)",
        severity = "ALTA 🔴 URGENTE",
        severityColor = Color(0xFFDC2626), // Red
        symptoms = listOf(
            "Manchas irregulares de aspecto acuoso",
            "Moho blanco grisáceo en el envés de las hojas",
            "Progresión rápida: puede destruir cultivo en 1-2 semanas",
            "Afecta hojas, tallos y tubérculos",
            "Olor característico a putrefacción"
        ),
        treatment = listOf(
            "🚨 ACCIÓN INMEDIATA REQUERIDA",
            "🔹 AISLAR plantas afectadas inmediatamente",
            "🔹 Aplicar fungicida sistémico urgente (Metalaxil + Mancozeb)",
            "🔹 Eliminar y destruir plantas severamente infectadas",
            "🔹 NO trabajar con plantas mojadas (evita dispersión)",
            "🔹 Aumentar ventilación del cultivo",
            "🔹 Aplicar cada 5-7 días mientras persistan condiciones húmedas",
            "🔹 Considerar cosecha temprana si infección es severa"
        ),
        prevention = listOf(
            "✓ Monitoreo DIARIO durante periodos húmedos",
            "✓ Aplicación preventiva de fungicidas protectantes",
            "✓ Evitar riego nocturno o tardío",
            "✓ Uso de variedades resistentes cuando sea posible",
            "✓ Eliminar plantas voluntarias y malezas",
            "✓ Alertas climáticas: T° 10-25°C + humedad >90%",
            "✓ No almacenar tubérculos con síntomas"
        )
    )
    
    private fun healthyInfo() = DiseaseInfo(
        name = "Planta Saludable ✅",
        severity = "ÓPTIMO",
        severityColor = Color(0xFF16A34A), // Green600
        symptoms = listOf(
            "Hojas de color verde intenso uniforme",
            "Sin manchas, decoloraciones o lesiones",
            "Crecimiento vigoroso y normal",
            "Buena turgencia de las hojas"
        ),
        treatment = listOf(
            "✓ No se requiere tratamiento",
            "✓ Continuar con las prácticas actuales de manejo",
            "✓ Mantener programa de nutrición balanceada",
            "✓ Riego adecuado según etapa fenológica"
        ),
        prevention = listOf(
            "✓ Monitoreo semanal preventivo",
            "✓ Inspección regular de hojas inferiores",
            "✓ Aplicar fungicida preventivo en periodos de alto riesgo",
            "✓ Mantener ventilación adecuada",
            "✓ Control de malezas hospederas",
            "✓ Rotación de cultivos planificada",
            "✓ Registrar condiciones climáticas",
            "✓ Capacitación continua en identificación temprana"
        )
    )
    
    private fun unknownInfo() = DiseaseInfo(
        name = "Resultado No Concluyente",
        severity = "DESCONOCIDO",
        severityColor = Color(0xFF6B7280), // Gray600
        symptoms = listOf(
            "No se pudo identificar claramente la condición",
            "Considere tomar una nueva imagen con mejor iluminación",
            "Enfoque la zona afectada directamente"
        ),
        treatment = listOf(
            "🔹 Repetir análisis con mejor calidad de imagen",
            "🔹 Consultar con agrónomo si hay síntomas visibles",
            "🔹 Monitorear evolución de la planta"
        ),
        prevention = listOf(
            "✓ Para mejores resultados:",
            "✓ Use luz natural",
            "✓ Enfoque clara zona afectada",
            "✓ Evite sombras y reflejos",
            "✓ Fotografíe desde 15-30 cm de distancia"
        )
    )
}
