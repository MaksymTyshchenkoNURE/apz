package ua.edu.nure.smartwarehouse.data.network

import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query
import ua.edu.nure.smartwarehouse.data.Product

interface WarehouseApi {
    // Ендпоінт для пошуку товару за назвою або ID
    @GET("api/products/search")
    suspend fun searchProduct(@Query("query") query: String): Response<Product>
}