namespace SmartWarehouse.API.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public int ZoneId { get; set; }
    public Zone? Zone { get; set; }
    public DateTime LastUpdated { get; set; }
}

public class Zone
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Capacity { get; set; } // Максимальна місткість зони
    public int CurrentLoad { get; set; } // Поточна завантаженість
}

public class AuditLog
{
    public int Id { get; set; }
    public DateTime Timestamp { get; set; }
    public string Action { get; set; } = string.Empty;
    public string Details { get; set; } = string.Empty;
}

public class MoveRequestDto
{
    public int ProductId { get; set; }
    public int TargetZoneId { get; set; }
}