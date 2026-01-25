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
fun AlertsScreen(onNavigate: (String) -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundLight)
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        Text(
            text = "Alertas Climáticas",
            style = MaterialTheme.typography.headlineMedium,
            color = Green800,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = "Notificaciones y avisos importantes",
            style = MaterialTheme.typography.bodyMedium,
            color = Gray600,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Active Alerts Summary
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
                    modifier = Modifier.size(40.dp)
                )
                Spacer(modifier = Modifier.width(16.dp))
                Column {
                    Text(
                        text = "3 Alertas Activas",
                        style = MaterialTheme.typography.titleLarge,
                        color = Orange600
                    )
                    Text(
                        text = "Requieren tu atención",
                        style = MaterialTheme.typography.bodyMedium,
                        color = Gray600
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        Text(
            text = "Alertas Recientes",
            style = MaterialTheme.typography.titleMedium,
            color = Gray800
        )

        Spacer(modifier = Modifier.height(12.dp))

        // Alert Items
        AlertItem(
            icon = Icons.Default.WaterDrop,
            title = "Lluvia Intensa Próxima",
            description = "Se esperan lluvias fuertes en las próximas 24 horas",
            time = "Hace 2 horas",
            severity = "alta"
        )

        Spacer(modifier = Modifier.height(12.dp))

        AlertItem(
            icon = Icons.Default.WbSunny,
            title = "Alta Temperatura",
            description = "Temperatura máxima de 32°C prevista mañana",
            time = "Hace 5 horas",
            severity = "media"
        )

        Spacer(modifier = Modifier.height(12.dp))

        AlertItem(
            icon = Icons.Default.Air,
            title = "Vientos Fuertes",
            description = "Ráfagas de viento de hasta 40 km/h",
            time = "Hace 1 día",
            severity = "baja"
        )

        Spacer(modifier = Modifier.height(12.dp))

        AlertItem(
            icon = Icons.Default.Thermostat,
            title = "Helada Nocturna",
            description = "Temperatura mínima de 2°C esta noche",
            time = "Hace 2 días",
            severity = "baja"
        )
    }
}

@Composable
fun AlertItem(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    title: String,
    description: String,
    time: String,
    severity: String
) {
    val (borderColor, iconColor, bgColor) = when (severity) {
        "alta" -> Triple(
            androidx.compose.ui.graphics.Color.Red,
            androidx.compose.ui.graphics.Color.Red,
            androidx.compose.ui.graphics.Color.Red.copy(alpha = 0.1f)
        )
        "media" -> Triple(Orange600, Orange600, Orange500.copy(alpha = 0.1f))
        else -> Triple(Blue500, Blue500, Blue500.copy(alpha = 0.1f))
    }

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = SurfaceLight
        ),
        border = androidx.compose.foundation.BorderStroke(1.dp, borderColor),
        onClick = { }
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Surface(
                modifier = Modifier.size(48.dp),
                shape = RoundedCornerShape(8.dp),
                color = bgColor
            ) {
                Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier.fillMaxSize()
                ) {
                    Icon(
                        imageVector = icon,
                        contentDescription = null,
                        tint = iconColor,
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
                Text(
                    text = time,
                    style = MaterialTheme.typography.labelSmall,
                    color = Gray600
                )
            }
        }
    }
}
