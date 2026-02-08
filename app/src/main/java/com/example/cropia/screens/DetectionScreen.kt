package com.example.cropia.screens

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.example.cropia.data.DetectionResult
import com.example.cropia.data.DiseaseInfo
import com.example.cropia.data.DiseaseKnowledgeBase
import com.example.cropia.ml.PlantDiseaseDetector
import com.example.cropia.ml.GeminiRecommendationService
import com.example.cropia.ml.SmolLM2Service
import com.example.cropia.ui.theme.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

enum class RecommendationMode {
    TEMPLATE,    // Offline, instant, expert templates
    SMOLLM2,     // Offline, 15s, on-device AI
    GEMINI       // Online, fast, cloud AI
}

@Composable
fun DetectionScreen(onNavigate: (String) -> Unit) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    
    var selectedImageBitmap by remember { mutableStateOf<Bitmap?>(null) }
    var isAnalyzing by remember { mutableStateOf(false) }
    var detectionResult by remember { mutableStateOf<DetectionResult?>(null) }
    var diseaseInfo by remember { mutableStateOf<DiseaseInfo?>(null) }
    var showTestImages by remember { mutableStateOf(false) }
    var errorMessage by remember { mutableStateOf<String?>(null) }
    var recommendationMode by remember { mutableStateOf(RecommendationMode.TEMPLATE) }
    var aiRecommendation by remember { mutableStateOf<String?>(null) }
    var isGeneratingAI by remember { mutableStateOf(false) }
    
    val detector = remember {
        android.util.Log.d("DetectionScreen", "Creating detector...")
        PlantDiseaseDetector(context)
    }
    
    // Lazy initialization - only create when needed
    var smolLM2Service: SmolLM2Service? by remember { mutableStateOf(null) }
    var smolLM2Error: String? by remember { mutableStateOf(null) }
    
    // TODO: Replace with your actual Gemini API key
    val geminiService = remember { 
        GeminiRecommendationService(apiKey = "YOUR_GEMINI_API_KEY_HERE")
    }
    
    val imagePickerLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        uri?.let {
            val bitmap = loadBitmapFromUri(context, it)
            selectedImageBitmap = bitmap
            detectionResult = null
            diseaseInfo = null
            errorMessage = null
            aiRecommendation = null
        }
    }
    
    fun generateAIRecommendation(result: DetectionResult, info: DiseaseInfo) {
        scope.launch {
            try {
                isGeneratingAI = true
                val serviceName = when(recommendationMode) {
                    RecommendationMode.SMOLLM2 -> "SmolLM2"
                    RecommendationMode.GEMINI -> "Gemini Pro"
                    else -> "IA"
                }
                android.widget.Toast.makeText(
                    context, 
                    "Generando con $serviceName...", 
                    android.widget.Toast.LENGTH_SHORT
                ).show()
                
                val recommendation = when(recommendationMode) {
                    RecommendationMode.SMOLLM2 -> {
                        // Lazy initialization on first use
                        if (smolLM2Service == null && smolLM2Error == null) {
                            try {
                                smolLM2Service = SmolLM2Service(context)
                            } catch (e: Exception) {
                                smolLM2Error = "SmolLM2 no disponible en esta plataforma: ${e.message}"
                                throw Exception(smolLM2Error)
                            }
                        }
                        if (smolLM2Error != null) {
                            throw Exception(smolLM2Error)
                        }
                        smolLM2Service!!.generateRecommendation(result, info)
                    }
                    RecommendationMode.GEMINI -> {
                        geminiService.generateRecommendation(result, info)
                    }
                    RecommendationMode.TEMPLATE -> {
                        // This shouldn't be called for templates
                        throw Exception("Modo template seleccionado")
                    }
                }
                
                aiRecommendation = recommendation
                isGeneratingAI = false
                
                android.widget.Toast.makeText(
                    context, 
                    "¡Recomendación generada!", 
                    android.widget.Toast.LENGTH_SHORT
                ).show()
            } catch (e: Exception) {
                isGeneratingAI = false
                aiRecommendation = null
                android.widget.Toast.makeText(
                    context, 
                    "Error generando IA: ${e.message}", 
                    android.widget.Toast.LENGTH_LONG
                ).show()
            }
        }
    }
    
    fun analyzeImage(bitmap: Bitmap) {
        android.util.Log.d("DetectionScreen", "analyzeImage called")
        android.widget.Toast.makeText(context, "Iniciando análisis...", android.widget.Toast.LENGTH_SHORT).show()
        
        scope.launch {
            try {
                isAnalyzing = true
                detectionResult = null
                diseaseInfo = null
                errorMessage = null
                aiRecommendation = null
                
                android.util.Log.d("DetectionScreen", "Starting detection on background thread")
                val result = withContext(Dispatchers.Default) {
                    detector.detect(bitmap)
                }
                
                android.util.Log.d("DetectionScreen", "Detection complete: $result")
                isAnalyzing = false
                
                if (result != null) {
                    detectionResult = result
                    diseaseInfo = DiseaseKnowledgeBase.getDiseaseInfo(result.className)
                    android.util.Log.d("DetectionScreen", "Result set: ${result.className}")
                    android.widget.Toast.makeText(context, "Análisis completado!", android.widget.Toast.LENGTH_SHORT).show()
                    
                    // Auto-generate AI recommendation if not using templates
                    if (recommendationMode != RecommendationMode.TEMPLATE) {
                        generateAIRecommendation(result, diseaseInfo!!)
                    }
                } else {
                    errorMessage = "No se pudo analizar la imagen. Verifica que el modelo esté cargado."
                    android.util.Log.e("DetectionScreen", "Result is null!")
                    android.widget.Toast.makeText(context, "Error: Resultado nulo", android.widget.Toast.LENGTH_LONG).show()
                }
            } catch (e: Exception) {
                android.util.Log.e("DetectionScreen", "Error in analyzeImage", e)
                isAnalyzing = false
                errorMessage = "Error: ${e.message}"
                android.widget.Toast.makeText(context, "Error: ${e.message}", android.widget.Toast.LENGTH_LONG).show()
            }
        }
    }
    
    fun loadTestImage(className: String) {
        try {
            val assetName = when (className) {
                "Early" -> "test_images/Early.JPG"
                "Healthy" -> "test_images/Healthy.JPG"
                "Late" -> "test_images/Late.JPG"
                else -> return
            }
            
            val inputStream = context.assets.open(assetName)
            val bitmap = BitmapFactory.decodeStream(inputStream)
            inputStream.close()
            
            selectedImageBitmap = bitmap
            detectionResult = null
            diseaseInfo = null
            showTestImages = false
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundLight)
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        // Header
        Text(
            text = "Detección de Plagas",
            style = MaterialTheme.typography.headlineMedium,
            color = Green800,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = "Analiza imágenes para detectar plagas con IA",
            style = MaterialTheme.typography.bodyMedium,
            color = Gray600,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Image Preview
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .height(300.dp),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(
                containerColor = if (selectedImageBitmap != null) SurfaceLight else Gray50
            ),
            border = androidx.compose.foundation.BorderStroke(2.dp, Green200)
        ) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                if (selectedImageBitmap != null) {
                    Image(
                        bitmap = selectedImageBitmap!!.asImageBitmap(),
                        contentDescription = "Selected image",
                        modifier = Modifier.fillMaxSize(),
                        contentScale = ContentScale.Crop
                    )
                } else {
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Icon(
                            imageVector = Icons.Default.Image,
                            contentDescription = "No image",
                            modifier = Modifier.size(64.dp),
                            tint = Green600
                        )
                        Spacer(modifier = Modifier.height(16.dp))
                        Text(
                            text = "Selecciona una imagen",
                            style = MaterialTheme.typography.bodyLarge,
                            color = Gray800
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Action Buttons
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            OutlinedButton(
                onClick = { imagePickerLauncher.launch("image/*") },
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.outlinedButtonColors(
                    contentColor = Green600
                ),
                border = androidx.compose.foundation.BorderStroke(1.dp, Green600)
            ) {
                Icon(Icons.Default.PhotoLibrary, contentDescription = null, modifier = Modifier.size(20.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text("Galería")
            }

            Button(
                onClick = { showTestImages = !showTestImages },
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Blue500
                )
            ) {
                Icon(Icons.Default.Science, contentDescription = null, modifier = Modifier.size(20.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text("Test")
            }
        }

        if (showTestImages) {
            Spacer(modifier = Modifier.height(12.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                listOf("Early", "Healthy", "Late").forEach { className ->
                    Button(
                        onClick = { loadTestImage(className) },
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(8.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Green500)
                    ) {
                        Text(className, style = MaterialTheme.typography.labelSmall)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Analyze Button
        Button(
            onClick = {
                selectedImageBitmap?.let { analyzeImage(it) }
            },
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            enabled = selectedImageBitmap != null && !isAnalyzing,
            colors = ButtonDefaults.buttonColors(
                containerColor = Green600
            )
        ) {
            if (isAnalyzing) {
                CircularProgressIndicator(
                    modifier = Modifier.size(20.dp),
                    color = SurfaceLight,
                    strokeWidth = 2.dp
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text("Analizando...")
            } else {
                Icon(Icons.Default.Search, contentDescription = null, modifier = Modifier.size(20.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text("Analizar Imagen")
            }
        }

        // Recommendation Mode Selector (3 options)
        Spacer(modifier = Modifier.height(16.dp))
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(
                containerColor = Green100
            )
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            ) {
                Text(
                    text = "Modo de Recomendaciones",
                    style = MaterialTheme.typography.titleMedium,
                    color = Gray800
                )
                Spacer(modifier = Modifier.height(8.dp))
                
                // Option 1: Templates
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    RadioButton(
                        selected = recommendationMode == RecommendationMode.TEMPLATE,
                        onClick = { 
                            recommendationMode = RecommendationMode.TEMPLATE
                            aiRecommendation = null
                        },
                        colors = RadioButtonDefaults.colors(selectedColor = Green600)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Column {
                        Text(
                            text = "📋 Templates del CIP",
                            style = MaterialTheme.typography.bodyMedium,
                            color = Gray800
                        )
                        Text(
                            text = "Instantáneo • Offline • Experto",
                            style = MaterialTheme.typography.bodySmall,
                            color = Gray600
                        )
                    }
                }
                
                // Option 2: SmolLM2 (NEW!)
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    RadioButton(
                        selected = recommendationMode == RecommendationMode.SMOLLM2,
                        onClick = { 
                            recommendationMode = RecommendationMode.SMOLLM2
                            if (detectionResult != null && diseaseInfo != null) {
                                generateAIRecommendation(detectionResult!!, diseaseInfo!!)
                            }
                        },
                        colors = RadioButtonDefaults.colors(selectedColor = Green600)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Column {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = "🤖 SmolLM2 AI",
                                style = MaterialTheme.typography.bodyMedium,
                                color = Gray800
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Surface(
                                shape = RoundedCornerShape(4.dp),
                                color = Green600
                            ) {
                                Text(
                                    text = "BETA",
                                    style = MaterialTheme.typography.labelSmall,
                                    color = SurfaceLight,
                                    modifier = Modifier.padding(horizontal = 4.dp, vertical = 2.dp)
                                )
                            }
                        }
                        Text(
                            text = "Demo • Offline • Basado en SmolLM2",
                            style = MaterialTheme.typography.bodySmall,
                            color = Gray600
                        )
                    }
                }
                
                // Option 3: Gemini
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    RadioButton(
                        selected = recommendationMode == RecommendationMode.GEMINI,
                        onClick = { 
                            recommendationMode = RecommendationMode.GEMINI
                            if (detectionResult != null && diseaseInfo != null) {
                                generateAIRecommendation(detectionResult!!, diseaseInfo!!)
                            }
                        },
                        colors = RadioButtonDefaults.colors(selectedColor = Green600)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Column {
                        Text(
                            text = "☁️ Gemini Pro",
                            style = MaterialTheme.typography.bodyMedium,
                            color = Gray800
                        )
                        Text(
                            text = "Rápido • Requiere internet",
                            style = MaterialTheme.typography.bodySmall,
                            color = Gray600
                        )
                    }
                }
            }
        }

        // Error message
        errorMessage?.let { error ->
            Spacer(modifier = Modifier.height(16.dp))
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(
                    containerColor = androidx.compose.ui.graphics.Color.Red.copy(alpha = 0.1f)
                ),
                border = androidx.compose.foundation.BorderStroke(1.dp, androidx.compose.ui.graphics.Color.Red)
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.Error,
                        contentDescription = null,
                        tint = androidx.compose.ui.graphics.Color.Red,
                        modifier = Modifier.size(24.dp)
                    )
                    Spacer(modifier = Modifier.width(12.dp))
                    Text(
                        text = error,
                        style = MaterialTheme.typography.bodyMedium,
                        color = androidx.compose.ui.graphics.Color.Red
                    )
                }
            }
        }

        // Results
        detectionResult?.let { result ->
            Spacer(modifier = Modifier.height(24.dp))

            diseaseInfo?.let { info ->
                DetectionResultCard(
                    result = result,
                    info = info,
                    recommendationMode = recommendationMode,
                    aiRecommendation = aiRecommendation,
                    isGeneratingAI = isGeneratingAI,
                    onRegenerateAI = { generateAIRecommendation(result, info) }
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Info Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(
                containerColor = Green100
            )
        ) {
            Row(
                modifier = Modifier.padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Default.Info,
                    contentDescription = null,
                    tint = Green600,
                    modifier = Modifier.size(24.dp)
                )
                Spacer(modifier = Modifier.width(12.dp))
                Column {
                    Text(
                        text = "Sobre la Detección",
                        style = MaterialTheme.typography.titleSmall,
                        color = Green800
                    )
                    Text(
                        text = "Usa IA avanzada (MobileViT) para identificar plagas en cultivos de papa con 98% de precisión.",
                        style = MaterialTheme.typography.bodySmall,
                        color = Gray600
                    )
                }
            }
        }
    }
}

@Composable
fun DetectionResultCard(
    result: DetectionResult,
    info: DiseaseInfo,
    recommendationMode: RecommendationMode,
    aiRecommendation: String?,
    isGeneratingAI: Boolean,
    onRegenerateAI: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = info.severityColor.copy(alpha = 0.1f)
        ),
        border = androidx.compose.foundation.BorderStroke(2.dp, info.severityColor)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            // Header with icon
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.fillMaxWidth()
            ) {
                Icon(
                    imageVector = when {
                        info.severity.contains("ALTA") -> Icons.Default.Warning
                        info.severity.contains("MODERADO") -> Icons.Default.Error
                        else -> Icons.Default.CheckCircle
                    },
                    contentDescription = null,
                    tint = info.severityColor,
                    modifier = Modifier.size(32.dp)
                )
                Spacer(modifier = Modifier.width(12.dp))
                Column {
                    Text(
                        text = info.name,
                        style = MaterialTheme.typography.titleLarge,
                        color = info.severityColor
                    )
                    Text(
                        text = info.severity,
                        style = MaterialTheme.typography.titleSmall,
                        color = info.severityColor
                    )
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Confidence
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Confianza:",
                    style = MaterialTheme.typography.bodyMedium,
                    color = Gray800
                )
                Text(
                    text = "${(result.confidence * 100).toInt()}%",
                    style = MaterialTheme.typography.titleLarge,
                    color = info.severityColor
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            LinearProgressIndicator(
                progress = { result.confidence },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(8.dp),
                color = info.severityColor,
                trackColor = info.severityColor.copy(alpha = 0.3f),
            )

            // All scores
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = "Probabilidades:",
                style = MaterialTheme.typography.titleSmall,
                color = Gray800
            )
            Spacer(modifier = Modifier.height(8.dp))
            val classNames = listOf("Tizón Temprano", "Saludable", "Tizón Tardío")
            result.allScores.forEachIndexed { index, score ->
                Row(
                    modifier = Modifier.fillMaxWidth().padding(vertical = 2.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = classNames[index],
                        style = MaterialTheme.typography.bodySmall,
                        color = Gray600
                    )
                    Text(
                        text = "${(score * 100).toInt()}%",
                        style = MaterialTheme.typography.bodySmall,
                        color = Gray600
                    )
                }
            }
            
            // Recommendations Section
            Spacer(modifier = Modifier.height(16.dp))
            HorizontalDivider(color = info.severityColor.copy(alpha = 0.3f))
            Spacer(modifier = Modifier.height(16.dp))
            
            // Display recommendations based on mode
            when (recommendationMode) {
                RecommendationMode.SMOLLM2, RecommendationMode.GEMINI -> {
                    // AI Generated Recommendations (SmolLM2 or Gemini)
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Icon(
                            imageVector = Icons.Default.Star,
                            contentDescription = null,
                            tint = Green600,
                            modifier = Modifier.size(24.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = when(recommendationMode) {
                                RecommendationMode.SMOLLM2 -> "Recomendación SmolLM2 AI"
                                RecommendationMode.GEMINI -> "Recomendación Gemini Pro"
                                else -> "Recomendación con IA"
                            },
                            style = MaterialTheme.typography.titleMedium,
                            color = Gray800
                        )
                        Spacer(modifier = Modifier.weight(1f))
                        if (!isGeneratingAI) {
                            IconButton(onClick = onRegenerateAI) {
                                Icon(
                                    imageVector = Icons.Default.Refresh,
                                    contentDescription = "Regenerar",
                                    tint = Green600
                                )
                            }
                        }
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    when {
                        isGeneratingAI -> {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.Center,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                CircularProgressIndicator(
                                    modifier = Modifier.size(24.dp),
                                    color = Green600,
                                    strokeWidth = 2.dp
                                )
                                Spacer(modifier = Modifier.width(12.dp))
                                Text(
                                    text = when(recommendationMode) {
                                        RecommendationMode.SMOLLM2 -> "Generando con SmolLM2 (~15s)..."
                                        RecommendationMode.GEMINI -> "Generando con Gemini Pro..."
                                        else -> "Generando recomendación..."
                                    },
                                    style = MaterialTheme.typography.bodyMedium,
                                    color = Gray600
                                )
                            }
                        }
                        aiRecommendation != null -> {
                            Text(
                                text = aiRecommendation,
                                style = MaterialTheme.typography.bodyMedium,
                                color = Gray600
                            )
                        }
                        else -> {
                            Text(
                                text = "Analice una imagen para ver recomendaciones personalizadas.",
                                style = MaterialTheme.typography.bodyMedium,
                                color = Gray600
                            )
                        }
                    }
                }
                
                RecommendationMode.TEMPLATE -> {
                    // Template Recommendations - Treatment
                    Text(
                        text = "💊 Tratamiento",
                        style = MaterialTheme.typography.titleMedium,
                        color = Gray800
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    info.treatment.forEach { item ->
                        Text(
                            text = item,
                            style = MaterialTheme.typography.bodyMedium,
                            color = Gray600,
                            modifier = Modifier.padding(vertical = 2.dp)
                        )
                    }
                    
                    // Prevention Section
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    Text(
                        text = "🛡️ Prevención",
                        style = MaterialTheme.typography.titleMedium,
                        color = Gray800
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    info.prevention.forEach { item ->
                        Text(
                            text = item,
                            style = MaterialTheme.typography.bodyMedium,
                            color = Gray600,
                            modifier = Modifier.padding(vertical = 2.dp)
                        )
                    }
                }
            }
        }
    }
}

private fun loadBitmapFromUri(context: Context, uri: Uri): Bitmap? {
    return try {
        val inputStream = context.contentResolver.openInputStream(uri)
        BitmapFactory.decodeStream(inputStream)?.also {
            inputStream?.close()
        }
    } catch (e: Exception) {
        e.printStackTrace()
        null
    }
}
