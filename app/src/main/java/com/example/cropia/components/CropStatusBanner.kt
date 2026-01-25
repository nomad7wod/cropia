package com.example.cropia.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.unit.dp
import com.example.cropia.ui.theme.*

@Composable
fun CropStatusBanner() {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = Green100
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = "Estado del Cultivo",
                    style = MaterialTheme.typography.titleMedium,
                    color = Green800
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = "Saludable - Sin plagas detectadas",
                    style = MaterialTheme.typography.bodyMedium,
                    color = Gray600
                )
            }
            
            Icon(
                imageVector = Icons.Default.CheckCircle,
                contentDescription = "Estado saludable",
                tint = Green600,
                modifier = Modifier.size(40.dp)
            )
        }
    }
}
