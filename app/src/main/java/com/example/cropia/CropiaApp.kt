package com.example.cropia

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.example.cropia.components.HamburgerMenu
import com.example.cropia.components.NavigationBar
import com.example.cropia.navigation.Screen
import com.example.cropia.screens.*
import com.example.cropia.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CropiaApp() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route ?: Screen.Home.route

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "Cultivos de Papa",
                        color = Green800
                    )
                },
                navigationIcon = {
                    HamburgerMenu(
                        onNavigate = { route ->
                            navController.navigate(route) {
                                launchSingleTop = true
                            }
                        }
                    )
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = SurfaceLight
                )
            )
        },
        bottomBar = {
            NavigationBar(
                currentScreen = currentRoute,
                onNavigate = { route ->
                    if (route == Screen.Home.route) {
                        // If navigating to home, pop everything back to home
                        navController.navigate(route) {
                            popUpTo(Screen.Home.route) {
                                inclusive = false
                            }
                            launchSingleTop = true
                        }
                    } else {
                        navController.navigate(route) {
                            popUpTo(Screen.Home.route) {
                                saveState = true
                            }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                }
            )
        },
        containerColor = BackgroundLight
    ) { paddingValues ->
        NavHost(
            navController = navController,
            startDestination = Screen.Home.route,
            modifier = Modifier.padding(paddingValues)
        ) {
            composable(Screen.Home.route) {
                HomeScreen(
                    onNavigate = { route ->
                        navController.navigate(route) {
                            launchSingleTop = true
                        }
                    }
                )
            }
            composable(Screen.Detection.route) {
                DetectionScreen(
                    onNavigate = { route ->
                        navController.navigate(route) {
                            launchSingleTop = true
                        }
                    }
                )
            }
            composable(Screen.Reports.route) {
                ReportsScreen(
                    onNavigate = { route ->
                        navController.navigate(route) {
                            launchSingleTop = true
                        }
                    }
                )
            }
            composable(Screen.Map.route) {
                MapScreen(
                    onNavigate = { route ->
                        navController.navigate(route) {
                            launchSingleTop = true
                        }
                    }
                )
            }
            composable(Screen.Alerts.route) {
                AlertsScreen(
                    onNavigate = { route ->
                        navController.navigate(route) {
                            launchSingleTop = true
                        }
                    }
                )
            }
            composable(Screen.Capture.route) {
                CaptureScreen(
                    onNavigate = { route ->
                        navController.navigate(route) {
                            launchSingleTop = true
                        }
                    }
                )
            }
            composable(Screen.Recommendations.route) {
                RecommendationsScreen(
                    onNavigate = { route ->
                        navController.navigate(route) {
                            launchSingleTop = true
                        }
                    }
                )
            }
            composable(Screen.Environmental.route) {
                EnvironmentalScreen(
                    onNavigate = { route ->
                        navController.navigate(route) {
                            launchSingleTop = true
                        }
                    }
                )
            }
            composable(Screen.Preprocessing.route) {
                PreprocessingScreen(
                    onNavigate = { route ->
                        navController.navigate(route) {
                            launchSingleTop = true
                        }
                    }
                )
            }
            composable(Screen.History.route) {
                HistoryScreen(
                    onNavigate = { route ->
                        navController.navigate(route) {
                            launchSingleTop = true
                        }
                    }
                )
            }
            composable(Screen.Trends.route) {
                TrendsScreen(
                    onNavigate = { route ->
                        navController.navigate(route) {
                            launchSingleTop = true
                        }
                    }
                )
            }
            composable(Screen.Profile.route) {
                ProfileScreen()
            }
            composable(Screen.AlertSettings.route) {
                AlertSettingsScreen()
            }
            composable(Screen.BannerSettings.route) {
                BannerSettingsScreen()
            }
            composable(Screen.Sessions.route) {
                SessionHistoryScreen()
            }
            composable(Screen.Help.route) {
                HelpScreen()
            }
            composable(Screen.About.route) {
                AboutScreen()
            }
        }
    }
}
