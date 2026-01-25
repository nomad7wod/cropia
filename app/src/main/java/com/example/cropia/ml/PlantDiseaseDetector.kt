package com.example.cropia.ml

import android.content.Context
import android.graphics.Bitmap
import com.example.cropia.data.DetectionResult
import com.example.cropia.data.DeploymentConfig
import com.google.gson.Gson
import org.pytorch.IValue
import org.pytorch.Module
import org.pytorch.torchvision.TensorImageUtils
import java.io.File
import java.io.FileOutputStream

class PlantDiseaseDetector(private val context: Context) {
    
    private var model: Module? = null
    private val classes = listOf("Early Blight", "Healthy", "Late Blight")
    var modelLoadError: String? = null
        private set
    
    // ImageNet normalization values (same as training)
    private val normMeanRGB = floatArrayOf(0.485f, 0.456f, 0.406f)
    private val normStdRGB = floatArrayOf(0.229f, 0.224f, 0.225f)
    
    init {
        loadModel()
    }
    
    private fun loadModel() {
        try {
            // Copy model from assets to internal storage
            val modelPath = assetFilePath("models/mobilevit_s_no_inference_mobile.pt")
            
            val file = File(modelPath)
            if (!file.exists()) {
                throw IllegalStateException("Model file does not exist at: $modelPath")
            }
            if (file.length() == 0L) {
                throw IllegalStateException("Model file is empty at: $modelPath")
            }
            
            model = Module.load(modelPath)
            android.widget.Toast.makeText(context, "Modelo cargado exitosamente", android.widget.Toast.LENGTH_SHORT).show()
        } catch (e: Exception) {
            modelLoadError = "Error cargando modelo: ${e.message}"
            android.widget.Toast.makeText(context, modelLoadError, android.widget.Toast.LENGTH_LONG).show()
            e.printStackTrace()
        }
    }
    
    fun detect(bitmap: Bitmap): DetectionResult? {
        if (model == null) {
            val errorMsg = modelLoadError ?: "Model is null - not loaded properly"
            throw IllegalStateException(errorMsg)
        }
        
        val resizedBitmap = Bitmap.createScaledBitmap(bitmap, 224, 224, true)
        
        // Convert bitmap to tensor with normalization
        val inputTensor = TensorImageUtils.bitmapToFloat32Tensor(
            resizedBitmap,
            normMeanRGB,
            normStdRGB
        )
        
        // Run inference
        val outputTensor = model?.forward(IValue.from(inputTensor))?.toTensor()
            ?: throw RuntimeException("Model forward pass returned null")
            
        val scores = outputTensor.dataAsFloatArray
            ?: throw RuntimeException("Output tensor has no data")
        
        if (scores.isEmpty()) {
            throw RuntimeException("Output scores array is empty")
        }
        
        // Apply softmax to get probabilities
        val probabilities = softmax(scores)
        
        // Get prediction
        val maxIdx = probabilities.indices.maxByOrNull { probabilities[it] } ?: 0
        
        return DetectionResult(
            className = classes[maxIdx],
            confidence = probabilities[maxIdx],
            allScores = probabilities.toList()
        )
    }
    
    private fun softmax(input: FloatArray): FloatArray {
        val maxInput = input.maxOrNull() ?: 0f
        val exps = input.map { kotlin.math.exp((it - maxInput).toDouble()).toFloat() }
        val sumExps = exps.sum()
        return exps.map { it / sumExps }.toFloatArray()
    }
    
    private fun assetFilePath(assetName: String): String {
        val file = File(context.filesDir, assetName)
        if (file.exists() && file.length() > 0) {
            return file.absolutePath
        }
        
        context.assets.open(assetName).use { inputStream ->
            file.parentFile?.mkdirs()
            FileOutputStream(file).use { outputStream ->
                val buffer = ByteArray(4 * 1024)
                var read: Int
                while (inputStream.read(buffer).also { read = it } != -1) {
                    outputStream.write(buffer, 0, read)
                }
                outputStream.flush()
            }
        }
        return file.absolutePath
    }
    
    fun loadConfig(): DeploymentConfig? {
        return try {
            val json = context.assets.open("models/deployment_config.json")
                .bufferedReader()
                .use { it.readText() }
            Gson().fromJson(json, DeploymentConfig::class.java)
        } catch (e: Exception) {
            println("✗ Error loading config: ${e.message}")
            null
        }
    }
    
    fun release() {
        model = null
    }
}
