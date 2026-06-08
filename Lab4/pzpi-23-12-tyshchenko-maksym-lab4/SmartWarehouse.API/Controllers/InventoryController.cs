using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartWarehouse.API.Data;
using SmartWarehouse.API.Models;

namespace SmartWarehouse.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InventoryController : ControllerBase
{
    private readonly WarehouseDbContext _context;

    public InventoryController(WarehouseDbContext context)
    {
        _context = context;
    }

    [HttpGet("products")]
    public async Task<IActionResult> GetAllProducts()
    {
        var products = await _context.Products.Include(p => p.Zone).ToListAsync();
        return Ok(products);
    }

    [HttpPost("move")]
    public async Task<IActionResult> MoveProduct([FromBody] MoveRequestDto request)
    {
        var product = await _context.Products.FindAsync(request.ProductId);
        var targetZone = await _context.Zones.FindAsync(request.TargetZoneId);

        if (product == null || targetZone == null)
            return NotFound("Товар або цільова зона не знайдені.");

        // Бізнес-правило 1: Перевірка місткості зони (Capacity Control)
        if (targetZone.CurrentLoad + product.Quantity > targetZone.Capacity)
        {
            await LogAction("ERROR", $"Zone Capacity Full: Відхилено переміщення {product.Name} у зону {targetZone.Name}");
            return BadRequest("Переміщення неможливе: зона переповнена.");
        }

        // Виконання переміщення
        product.ZoneId = targetZone.Id;
        product.LastUpdated = DateTime.UtcNow;
        targetZone.CurrentLoad += product.Quantity;

        await LogAction("MOVE", $"Товар {product.Name} успішно переміщено у {targetZone.Name}");

        // Бізнес-правило 2: Автоматичне замовлення (AUTO_ORDER)
        if (product.Quantity < 10)
        {
            await LogAction("AUTO_ORDER", $"Критичний рівень запасів для: {product.Name} ({product.Quantity} шт.)");
        }

        await _context.SaveChangesAsync();
        return Ok(product);
    }

    [HttpGet("logs")]
    public async Task<IActionResult> GetLogs()
    {
        var logs = await _context.AuditLogs.OrderByDescending(l => l.Timestamp).Take(50).ToListAsync();
        return Ok(logs);
    }

    private async Task LogAction(string action, string details)
    {
        _context.AuditLogs.Add(new AuditLog
        {
            Timestamp = DateTime.UtcNow,
            Action = action,
            Details = details
        });
        await _context.SaveChangesAsync(); // Проміжне збереження логу
    }
}