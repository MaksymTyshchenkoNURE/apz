package ua.edu.nure.smartwarehouse.ui.search

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import ua.edu.nure.smartwarehouse.data.Product
import ua.edu.nure.smartwarehouse.data.repository.WarehouseRepository

// Відтворення UML Діаграми станів
sealed class SearchState {
    object Idle : SearchState()
    object Loading : SearchState()
    data class Success(val product: Product) : SearchState()
    data class Error(val message: String) : SearchState()
}

class SearchViewModel(private val repository: WarehouseRepository) : ViewModel() {

    private val _uiState = MutableStateFlow<SearchState>(SearchState.Idle)
    val uiState: StateFlow<SearchState> = _uiState.asStateFlow()

    fun searchProduct(query: String) {
        if (query.isBlank()) return
        
        _uiState.value = SearchState.Loading
        
        viewModelScope.launch {
            // У реальному релізі тут буде repository.searchProduct(query)
            val result = repository.searchProductMock(query)
            
            result.fold(
                onSuccess = { product ->
                    _uiState.value = SearchState.Success(product)
                },
                onFailure = { error ->
                    _uiState.value = SearchState.Error(error.message ?: "Невідома помилка мережі")
                }
            )
        }
    }
    
    fun resetState() {
        _uiState.value = SearchState.Idle
    }
}