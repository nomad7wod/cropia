package com.example.cropia.components

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import com.example.cropia.navigation.Screen
import com.example.cropia.ui.theme.*

@Composable
fun NavigationBar(
    currentScreen: String,
    onNavigate: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val navItems = listOf(
        NavItem(Screen.Home.route, Icons.Default.Home, "Inicio"),
        NavItem(Screen.Detection.route, Icons.Default.Search, "Detectar"),
        NavItem(Screen.Reports.route, Icons.Default.Description, "Reportes"),
        NavItem(Screen.Map.route, Icons.Default.Place, "Mapa"),
        NavItem(Screen.Alerts.route, Icons.Default.Notifications, "Alertas")
    )

    NavigationBar(
        modifier = modifier,
        containerColor = SurfaceLight,
        tonalElevation = 0.dp
    ) {
        navItems.forEach { item ->
            NavigationBarItem(
                icon = {
                    Icon(
                        imageVector = item.icon,
                        contentDescription = item.label
                    )
                },
                label = {
                    Text(
                        text = item.label,
                        style = MaterialTheme.typography.labelSmall
                    )
                },
                selected = currentScreen == item.route,
                onClick = { onNavigate(item.route) },
                colors = NavigationBarItemDefaults.colors(
                    selectedIconColor = Green700,
                    selectedTextColor = Green700,
                    indicatorColor = Green100,
                    unselectedIconColor = Gray600,
                    unselectedTextColor = Gray600
                )
            )
        }
    }
}

data class NavItem(
    val route: String,
    val icon: ImageVector,
    val label: String
)
