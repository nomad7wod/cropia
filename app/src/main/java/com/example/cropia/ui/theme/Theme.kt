package com.example.cropia.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LightColorScheme = lightColorScheme(
    primary = Green600,
    onPrimary = Color.White,
    primaryContainer = Green100,
    onPrimaryContainer = Green800,
    secondary = Green500,
    onSecondary = Color.White,
    tertiary = Blue500,
    background = BackgroundLight,
    onBackground = Gray800,
    surface = SurfaceLight,
    onSurface = Gray800,
    surfaceVariant = Green50,
    onSurfaceVariant = Gray600,
    outline = Green200,
    error = Color(0xFFDC2626),
    onError = Color.White
)

@Composable
fun CropiaTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
