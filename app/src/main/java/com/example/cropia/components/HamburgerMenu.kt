package com.example.cropia.components

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.cropia.navigation.Screen
import com.example.cropia.ui.theme.*

@Composable
fun HamburgerMenu(
    onNavigate: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }

    IconButton(
        onClick = { expanded = true },
        modifier = modifier
    ) {
        Icon(
            imageVector = Icons.Default.Menu,
            contentDescription = "Menú",
            tint = Green800
        )
    }

    DropdownMenu(
        expanded = expanded,
        onDismissRequest = { expanded = false },
        modifier = Modifier.width(250.dp)
    ) {
        // Profile Section
        DropdownMenuItem(
            text = { Text("Perfil") },
            leadingIcon = {
                Icon(Icons.Default.Person, contentDescription = null)
            },
            onClick = {
                expanded = false
                onNavigate(Screen.Profile.route)
            }
        )
        
        Divider()
        
        // Settings Section
        Text(
            text = "Configuración",
            style = MaterialTheme.typography.labelMedium,
            color = Gray600,
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
        )
        
        DropdownMenuItem(
            text = { Text("Configuración de Alertas") },
            leadingIcon = {
                Icon(Icons.Default.Settings, contentDescription = null)
            },
            onClick = {
                expanded = false
                onNavigate(Screen.AlertSettings.route)
            }
        )
        
        DropdownMenuItem(
            text = { Text("Configuración de Banner") },
            leadingIcon = {
                Icon(Icons.Default.Dashboard, contentDescription = null)
            },
            onClick = {
                expanded = false
                onNavigate(Screen.BannerSettings.route)
            }
        )
        
        DropdownMenuItem(
            text = { Text("Historial de Sesiones") },
            leadingIcon = {
                Icon(Icons.Default.History, contentDescription = null)
            },
            onClick = {
                expanded = false
                onNavigate(Screen.Sessions.route)
            }
        )
        
        Divider()
        
        // Help Section
        DropdownMenuItem(
            text = { Text("Ayuda") },
            leadingIcon = {
                Icon(Icons.Default.Help, contentDescription = null)
            },
            onClick = {
                expanded = false
                onNavigate(Screen.Help.route)
            }
        )
        
        DropdownMenuItem(
            text = { Text("Acerca de") },
            leadingIcon = {
                Icon(Icons.Default.Info, contentDescription = null)
            },
            onClick = {
                expanded = false
                onNavigate(Screen.About.route)
            }
        )
    }
}
