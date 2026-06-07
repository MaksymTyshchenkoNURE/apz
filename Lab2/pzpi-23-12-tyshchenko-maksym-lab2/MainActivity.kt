package ua.edu.nure.smartwarehouse.ui

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import ua.edu.nure.smartwarehouse.ui.search.SearchState
import ua.edu.nure.smartwarehouse.ui.search.SearchViewModel
import ua.edu.nure.smartwarehouse.data.repository.WarehouseRepository
import ua.edu.nure.smartwarehouse.data.network.WarehouseApi
import retrofit2.Retrofit

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Спрощена ініціалізація (у реальному проєкті використовуйте Dagger/Hilt)
        val dummyApi = Retrofit.Builder().baseUrl("http://localhost/").build().create(WarehouseApi::class.java)
        val repository = WarehouseRepository(dummyApi)
        val viewModel = SearchViewModel(repository)

        setContent {
            MaterialTheme {
                Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    WarehouseSearchScreen(viewModel)
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun WarehouseSearchScreen(viewModel: SearchViewModel) {
    val state by viewModel.uiState.collectAsState()
    var searchQuery by remember { mutableStateOf("") }

    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("Пошук активів (Asset Locator)", fontSize = 24.sp, modifier = Modifier.padding(bottom = 24.dp))

        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            label = { Text("Назва або ID товару") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true
        )

        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = { viewModel.searchProduct(searchQuery) },
            modifier = Modifier.fillMaxWidth().height(50.dp),
            enabled = state !is SearchState.Loading
        ) {
            Text("Знайти товар")
        }

        Spacer(modifier = Modifier.height(32.dp))

        // Обробка станів згідно з State Diagram
        when (val currentState = state) {
            is SearchState.Idle -> {
                Text("Введіть дані для пошуку", color = Color.Gray)
            }
            is SearchState.Loading -> {
                CircularProgressIndicator()
            }
            is SearchState.Success -> {
                Card(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text("Товар: ${currentState.product.name}", fontSize = 20.sp)
                        Text("Зона: ${currentState.product.zone}", color = Color.Blue, fontSize = 18.sp)
                        Text("Залишок: ${currentState.product.quantity} шт.", fontSize = 18.sp)
                    }
                }
            }
            is SearchState.Error -> {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("Помилка: ${currentState.message}", color = Color.Red, fontSize = 18.sp)
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    // Кнопка для ескалації проблеми
                    Button(
                        onClick = { /* Логіка відправки логу про помилку */ },
                        colors = ButtonDefaults.buttonColors(containerColor = Color.Red)
                    ) {
                        Text("Я застрял!", color = Color.White)
                    }
                }
            }
        }
    }
}