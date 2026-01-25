package com.example.cropia.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.example.cropia.ui.theme.*

@Composable
fun CaptureScreen(onNavigate: (String) -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundLight)
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        Text(
            text = "Capturar Imagen",
            style = MaterialTheme.typography.headlineMedium,
            color = Green800,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = "Toma una foto de tu cultivo",
            style = MaterialTheme.typography.bodyMedium,
            color = Gray600,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Camera Preview Area
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .height(300.dp),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(
                containerColor = Gray800
            )
        ) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.CameraAlt,
                    contentDescription = "Cámara",
                    modifier = Modifier.size(80.dp),
                    tint = SurfaceLight
                )
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Capture Buttons
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            OutlinedButton(
                onClick = { },
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.outlinedButtonColors(
                    contentColor = Green600
                ),
                border = androidx.compose.foundation.BorderStroke(1.dp, Green600)
            ) {
                Icon(Icons.Default.PhotoLibrary, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text("Galería")
            }

            Button(
                onClick = { },
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Green600
                )
            ) {
                Icon(Icons.Default.CameraAlt, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text("Capturar")
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Tips Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(
                containerColor = Green100
            )
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "Consejos para Mejores Resultados",
                    style = MaterialTheme.typography.titleMedium,
                    color = Green800
                )
                Spacer(modifier = Modifier.height(12.dp))

                TipItem("📸", "Usa buena iluminación natural")
                TipItem("🎯", "Enfoca la zona afectada")
                TipItem("📐", "Mantén la cámara estable")
                TipItem("🔍", "Acércate lo suficiente")
            }
        }
    }
}

@Composable
fun TipItem(emoji: String, text: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = emoji,
            style = MaterialTheme.typography.bodyLarge
        )
        Spacer(modifier = Modifier.width(12.dp))
        Text(
            text = text,
            style = MaterialTheme.typography.bodyMedium,
            color = Gray800
        )
    }
}
