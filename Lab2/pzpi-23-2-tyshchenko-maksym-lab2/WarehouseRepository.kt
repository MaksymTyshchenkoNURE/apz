package ua.edu.nure.smartwarehouse.data.repository

import ua.edu.nure.smartwarehouse.data.Product
import ua.edu.nure.smartwarehouse.data.network.WarehouseApi
import kotlinx.coroutines.delay

class WarehouseRepository(private val api: WarehouseApi) {
    
    // Імітація мережевого запиту для прототипу (поки сервер С++ не має HTTP-інтерфейсу)
    suspend fun searchProductMock(query: String): Result<Product> {
        delay(1000) // Імітація затримки мережі
        
        return when (query.lowercase()) {
            "box", "коробка" -> Result.success(Product("1001", "Коробка картона", "Storage A", 45))
            "pallet", "палета" -> Result.success(Product("1002", "Дерев'яна палета", "Shipping", 12))
            "scanner" -> Result.success(Product("1003", "RFID Сканер", "Reception", 5))
            else -> Result.failure(Exception("Товар не знайдено на складі"))
        }
    }
}