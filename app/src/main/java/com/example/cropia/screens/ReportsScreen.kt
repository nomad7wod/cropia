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
fun ReportsScreen(onNavigate: (String) -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundLight)
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        Text(
            text = "Reportes",
            style = MaterialTheme.typography.headlineMedium,
            color = Green800,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = "Historial de análisis y detecciones",
            style = MaterialTheme.typography.bodyMedium,
            color = Gray600,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Generate Report Button
        Button(
            onClick = { },
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Green600
            )
        ) {
            Icon(Icons.Default.Add, contentDescription = null)
            Spacer(modifier = Modifier.width(8.dp))
            Text("Generar Nuevo Reporte")
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Report Items
        ReportItem(
            title = "Análisis - Parcela A",
            date = "24 Ene 2026",
            status = "Alerta",
            statusColor = Orange600,
            description = "2 plagas detectadas"
        )

        Spacer(modifier = Modifier.height(12.dp))

        ReportItem(
            title = "Análisis - Parcela B",
            date = "23 Ene 2026",
            status = "Normal",
            statusColor = Green600,
            description = "Sin plagas detectadas"
        )

        Spacer(modifier = Modifier.height(12.dp))

        ReportItem(
            title = "Análisis - Parcela C",
            date = "22 Ene 2026",
            status = "Normal",
            statusColor = Green600,
            description = "Sin plagas detectadas"
        )

        Spacer(modifier = Modifier.height(12.dp))

        ReportItem(
            title = "Análisis - Parcela A",
            date = "20 Ene 2026",
            status = "Alerta",
            statusColor = Orange600,
            description = "1 plaga detectada"
        )
    }
}

@Composable
fun ReportItem(
    title: String,
    date: String,
    status: String,
    statusColor: androidx.compose.ui.graphics.Color,
    description: String
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = SurfaceLight
        ),
        border = androidx.compose.foundation.BorderStroke(1.dp, Green200),
        onClick = { }
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Surface(
                modifier = Modifier.size(48.dp),
                shape = RoundedCornerShape(8.dp),
                color = statusColor.copy(alpha = 0.1f)
            ) {
                Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier.fillMaxSize()
                ) {
                    Icon(
                        imageVector = Icons.Default.Description,
                        contentDescription = null,
                        tint = statusColor,
                        modifier = Modifier.size(24.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.width(16.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    color = Gray800
                )
                Text(
                    text = description,
                    style = MaterialTheme.typography.bodySmall,
                    color = Gray600
                )
                Spacer(modifier = Modifier.height(4.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.CalendarToday,
                        contentDescription = null,
                        tint = Gray600,
                        modifier = Modifier.size(12.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = date,
                        style = MaterialTheme.typography.labelSmall,
                        color = Gray600
                    )
                }
            }

            Spacer(modifier = Modifier.width(8.dp))

            Surface(
                shape = RoundedCornerShape(12.dp),
                color = statusColor.copy(alpha = 0.1f)
            ) {
                Text(
                    text = status,
                    style = MaterialTheme.typography.labelSmall,
                    color = statusColor,
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                )
            }
        }
    }
}
