package com.example.cropia.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.example.cropia.ui.theme.*

@Composable
fun RecommendationsScreen(onNavigate: (String) -> Unit) {
    PlaceholderScreen(
        title = "Recomendaciones",
        description = "Consejos personalizados para tu cultivo"
    )
}

@Composable
fun EnvironmentalScreen(onNavigate: (String) -> Unit) {
    PlaceholderScreen(
        title = "Datos Ambientales",
        description = "Registro de temperatura, humedad y condiciones"
    )
}

@Composable
fun PreprocessingScreen(onNavigate: (String) -> Unit) {
    PlaceholderScreen(
        title = "Procesamiento de Imágenes",
        description = "Optimiza y mejora tus imágenes"
    )
}

@Composable
fun HistoryScreen(onNavigate: (String) -> Unit) {
    PlaceholderScreen(
        title = "Historial",
        description = "Revisa análisis y reportes anteriores"
    )
}

@Composable
fun TrendsScreen(onNavigate: (String) -> Unit) {
    PlaceholderScreen(
        title = "Tendencias",
        description = "Análisis de patrones y estadísticas"
    )
}

@Composable
fun ProfileScreen() {
    PlaceholderScreen(
        title = "Perfil",
        description = "Información de usuario y configuración"
    )
}

@Composable
fun AlertSettingsScreen() {
    PlaceholderScreen(
        title = "Configuración de Alertas",
        description = "Personaliza tus notificaciones"
    )
}

@Composable
fun BannerSettingsScreen() {
    PlaceholderScreen(
        title = "Configuración de Banner",
        description = "Ajusta la información del banner principal"
    )
}

@Composable
fun SessionHistoryScreen() {
    PlaceholderScreen(
        title = "Historial de Sesiones",
        description = "Revisa tu actividad en la app"
    )
}

@Composable
fun HelpScreen() {
    PlaceholderScreen(
        title = "Ayuda",
        description = "Guías y preguntas frecuentes"
    )
}

@Composable
fun AboutScreen() {
    PlaceholderScreen(
        title = "Acerca de",
        description = "Información sobre la aplicación"
    )
}

@Composable
fun PlaceholderScreen(
    title: String,
    description: String
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundLight)
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = title,
            style = MaterialTheme.typography.headlineMedium,
            color = Green800,
            textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = description,
            style = MaterialTheme.typography.bodyMedium,
            color = Gray600,
            textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.height(24.dp))
        Text(
            text = "🚧 En Construcción 🚧",
            style = MaterialTheme.typography.titleLarge,
            color = Orange600,
            textAlign = TextAlign.Center
        )
    }
}
