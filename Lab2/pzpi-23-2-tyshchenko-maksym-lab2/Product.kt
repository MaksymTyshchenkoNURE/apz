package ua.edu.nure.smartwarehouse.data

/**
 * Модель товару, що отримується з бекенду (з products_db.txt).
 */
data class Product(
    val id: String,
    val name: String,
    val zone: String, // Наприклад: Reception, Storage A, Shipping
    val quantity: Int
)