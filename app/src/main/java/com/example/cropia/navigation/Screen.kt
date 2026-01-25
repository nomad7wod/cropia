package com.example.cropia.navigation

sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Detection : Screen("detection")
    object Reports : Screen("reports")
    object Recommendations : Screen("recommendations")
    object Map : Screen("map")
    object Alerts : Screen("alerts")
    object Capture : Screen("capture")
    object Environmental : Screen("environmental")
    object Preprocessing : Screen("preprocessing")
    object History : Screen("history")
    object Trends : Screen("trends")
    object Profile : Screen("profile")
    object AlertSettings : Screen("alert_settings")
    object BannerSettings : Screen("banner_settings")
    object Sessions : Screen("sessions")
    object Help : Screen("help")
    object About : Screen("about")
}
