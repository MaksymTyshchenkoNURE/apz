using Microsoft.EntityFrameworkCore;
using SmartWarehouse.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Додавання контролерів
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Підключення PostgreSQL
builder.Services.AddDbContext<WarehouseDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Налаштування CORS для підключення React-фронтенду
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// Автоматичне створення БД при запуску сервера
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<WarehouseDbContext>();
    db.Database.EnsureCreated();// Пример сервиса
public class InventoryService
{
    private readonly WarehouseDbContext _context;
    public InventoryService(WarehouseDbContext context) => _context = context;

    public async Task<(bool Success, string Message, Product? Product)> MoveProductAsync(int productId, int targetZoneId)
    {
        // ... бизнес-логика перемещения ...
    }
}

// В контроллере
[HttpPost("move")]
public async Task<IActionResult> MoveProduct([FromBody] MoveRequestDto request)
{
    var result = await _inventoryService.MoveProductAsync(request.ProductId, request.TargetZoneId);
    if (!result.Success)
        return BadRequest(result.Message);
    return Ok(result.Product);
}

}

// Увімкнення Swagger UI для тестування API
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();