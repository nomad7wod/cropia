package com.example.cropia.data

data class DetectionResult(
    val className: String,
    val confidence: Float,
    val allScores: List<Float>,
    val timestamp: Long = System.currentTimeMillis()
)

data class DiseaseInfo(
    val name: String,
    val severity: String,
    val severityColor: androidx.compose.ui.graphics.Color,
    val symptoms: List<String>,
    val treatment: List<String>,
    val prevention: List<String>
)

data class DeploymentConfig(
    val version: String,
    val date: String,
    val models: ModelInfo,
    val classes: List<String>
)

data class ModelInfo(
    val vision: VisionModelInfo
)

data class VisionModelInfo(
    val framework: String,
    val architecture: String,
    val accuracy: Double,
    val latency_ms: Double,
    val size_mb: Double,
    val file: String
)
