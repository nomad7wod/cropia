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
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.example.cropia.components.CropStatusBanner
import com.example.cropia.navigation.Screen
import com.example.cropia.ui.theme.*

@Composable
fun HomeScreen(
    onNavigate: (String) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundLight)
            .verticalScroll(rememberScrollState())
            .padding(vertical = 16.dp)
    ) {
        // Header
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Cropia",
                style = MaterialTheme.typography.headlineMedium,
                color = Green800,
                textAlign = TextAlign.Center
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Detección inteligente de plagas en cultivos de papa",
                style = MaterialTheme.typography.bodyMedium,
                color = Gray600,
                textAlign = TextAlign.Center
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Crop Status Banner
        CropStatusBanner()

        Spacer(modifier = Modifier.height(24.dp))

        // Quick Actions
        Column(modifier = Modifier.padding(horizontal = 16.dp)) {
            Text(
                text = "Acciones Rápidas",
                style = MaterialTheme.typography.titleMedium,
                color = Gray800
            )
            Spacer(modifier = Modifier.height(12.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                QuickActionButton(
                    icon = Icons.Default.Search,
                    label = "Detectar Plaga",
                    color = Green500,
                    onClick = { onNavigate(Screen.Detection.route) },
                    modifier = Modifier.weight(1f)
                )
                QuickActionButton(
                    icon = Icons.Default.CameraAlt,
                    label = "Capturar Imagen",
                    color = Blue500,
                    onClick = { onNavigate(Screen.Capture.route) },
                    modifier = Modifier.weight(1f)
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                QuickActionButton(
                    icon = Icons.Default.Description,
                    label = "Generar Reporte",
                    color = Purple500,
                    onClick = { onNavigate(Screen.Reports.route) },
                    modifier = Modifier.weight(1f)
                )
                QuickActionButton(
                    icon = Icons.Default.Lightbulb,
                    label = "Recomendaciones",
                    color = Orange500,
                    onClick = { onNavigate(Screen.Recommendations.route) },
                    modifier = Modifier.weight(1f)
                )
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Features
        Column(modifier = Modifier.padding(horizontal = 16.dp)) {
            Text(
                text = "Funcionalidades",
                style = MaterialTheme.typography.titleMedium,
                color = Gray800
            )
            Spacer(modifier = Modifier.height(12.dp))

            FeatureCard(
                icon = Icons.Default.Place,
                title = "Mapa de Riesgos",
                description = "Visualiza áreas de riesgo",
                onClick = { onNavigate(Screen.Map.route) }
            )
            Spacer(modifier = Modifier.height(12.dp))

            FeatureCard(
                icon = Icons.Default.Notifications,
                title = "Alertas Climáticas",
                description = "Notificaciones automáticas",
                onClick = { onNavigate(Screen.Alerts.route) }
            )
            Spacer(modifier = Modifier.height(12.dp))

            FeatureCard(
                icon = Icons.Default.Thermostat,
                title = "Datos Ambientales",
                description = "Registro de condiciones",
                onClick = { onNavigate(Screen.Environmental.route) }
            )
            Spacer(modifier = Modifier.height(12.dp))

            FeatureCard(
                icon = Icons.Default.Settings,
                title = "Procesamiento",
                description = "Optimiza tus imágenes",
                onClick = { onNavigate(Screen.Preprocessing.route) }
            )
            Spacer(modifier = Modifier.height(12.dp))

            FeatureCard(
                icon = Icons.Default.History,
                title = "Historial",
                description = "Revisa reportes anteriores",
                onClick = { onNavigate(Screen.History.route) }
            )
            Spacer(modifier = Modifier.height(12.dp))

            FeatureCard(
                icon = Icons.Default.TrendingUp,
                title = "Tendencias",
                description = "Análisis de patrones",
                onClick = { onNavigate(Screen.Trends.route) }
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Status Summary
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(
                containerColor = Green50
            ),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "Resumen del Estado",
                    style = MaterialTheme.typography.titleMedium,
                    color = Green800
                )
                Spacer(modifier = Modifier.height(16.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceEvenly
                ) {
                    StatusItem(
                        value = "15",
                        label = "Análisis hoy",
                        color = Green600
                    )
                    StatusItem(
                        value = "3",
                        label = "Alertas activas",
                        color = Orange600
                    )
                    StatusItem(
                        value = "8.2",
                        label = "Hectáreas monitoreadas",
                        color = Blue500
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))
    }
}

@Composable
fun QuickActionButton(
    icon: ImageVector,
    label: String,
    color: androidx.compose.ui.graphics.Color,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Button(
        onClick = onClick,
        modifier = modifier.height(80.dp),
        shape = RoundedCornerShape(12.dp),
        colors = ButtonDefaults.buttonColors(
            containerColor = color
        )
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Icon(
                imageVector = icon,
                contentDescription = label,
                modifier = Modifier.size(28.dp)
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = label,
                style = MaterialTheme.typography.labelMedium,
                textAlign = TextAlign.Center
            )
        }
    }
}

@Composable
fun FeatureCard(
    icon: ImageVector,
    title: String,
    description: String,
    onClick: () -> Unit
) {
    Card(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = SurfaceLight
        ),
        border = androidx.compose.foundation.BorderStroke(1.dp, Green200),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Surface(
                modifier = Modifier.size(40.dp),
                shape = RoundedCornerShape(8.dp),
                color = Green100
            ) {
                Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier.fillMaxSize()
                ) {
                    Icon(
                        imageVector = icon,
                        contentDescription = title,
                        tint = Green600,
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
            }
        }
    }
}

@Composable
fun StatusItem(
    value: String,
    label: String,
    color: androidx.compose.ui.graphics.Color
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = value,
            style = MaterialTheme.typography.headlineMedium,
            color = color
        )
        Text(
            text = label,
            style = MaterialTheme.typography.labelSmall,
            color = Gray600,
            textAlign = TextAlign.Center
        )
    }
}
