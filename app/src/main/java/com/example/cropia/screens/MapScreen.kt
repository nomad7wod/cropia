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
fun MapScreen(onNavigate: (String) -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundLight)
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        Text(
            text = "Mapa de Riesgos",
            style = MaterialTheme.typography.headlineMedium,
            color = Green800,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = "Visualiza zonas de riesgo en tu cultivo",
            style = MaterialTheme.typography.bodyMedium,
            color = Gray600,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Map Placeholder
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .height(250.dp),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(
                containerColor = Green100
            )
        ) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        imageVector = Icons.Default.Map,
                        contentDescription = "Mapa",
                        modifier = Modifier.size(64.dp),
                        tint = Green600
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Mapa Interactivo",
                        style = MaterialTheme.typography.titleMedium,
                        color = Green800
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Legend
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(
                containerColor = SurfaceLight
            ),
            border = androidx.compose.foundation.BorderStroke(1.dp, Green200)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "Leyenda",
                    style = MaterialTheme.typography.titleMedium,
                    color = Gray800
                )
                Spacer(modifier = Modifier.height(12.dp))

                LegendItem(Green600, "Zona Segura", "Sin riesgo detectado")
                Spacer(modifier = Modifier.height(8.dp))
                LegendItem(Orange600, "Zona de Alerta", "Monitoreo requerido")
                Spacer(modifier = Modifier.height(8.dp))
                LegendItem(androidx.compose.ui.graphics.Color.Red, "Zona de Riesgo", "Acción inmediata")
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Risk Areas
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(
                containerColor = Orange500.copy(alpha = 0.1f)
            ),
            border = androidx.compose.foundation.BorderStroke(1.dp, Orange500)
        ) {
            Row(
                modifier = Modifier.padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Default.Warning,
                    contentDescription = null,
                    tint = Orange600,
                    modifier = Modifier.size(32.dp)
                )
                Spacer(modifier = Modifier.width(12.dp))
                Column {
                    Text(
                        text = "2 Zonas de Alerta",
                        style = MaterialTheme.typography.titleMedium,
                        color = Orange600
                    )
                    Text(
                        text = "Parcelas A y D requieren atención",
                        style = MaterialTheme.typography.bodySmall,
                        color = Gray600
                    )
                }
            }
        }
    }
}

@Composable
fun LegendItem(
    color: androidx.compose.ui.graphics.Color,
    title: String,
    description: String
) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Surface(
            modifier = Modifier.size(24.dp),
            shape = RoundedCornerShape(4.dp),
            color = color
        ) {}
        Spacer(modifier = Modifier.width(12.dp))
        Column {
            Text(
                text = title,
                style = MaterialTheme.typography.bodyMedium,
                color = Gray800
            )
            Text(
                text = description,
                style = MaterialTheme.typography.bodySmall,
                color = Gray600
            )
        }
    }
}
