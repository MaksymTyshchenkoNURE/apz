using Microsoft.EntityFrameworkCore;
using SmartWarehouse.API.Models;

namespace SmartWarehouse.API.Data;

public class WarehouseDbContext : DbContext
{
    public WarehouseDbContext(DbContextOptions<WarehouseDbContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }
    public DbSet<Zone> Zones { get; set; }
    public DbSet<AuditLog> AuditLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Початкове наповнення бази даних (Seeding)
        modelBuilder.Entity<Zone>().HasData(
            new Zone { Id = 1, Name = "Reception", Capacity = 100, CurrentLoad = 15 },
            new Zone { Id = 2, Name = "Storage A", Capacity = 500, CurrentLoad = 450 },
            new Zone { Id = 3, Name = "Shipping", Capacity = 50, CurrentLoad = 10 }
        );

        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Кабель оптичний", Quantity = 45, ZoneId = 2, LastUpdated = DateTime.UtcNow },
            new Product { Id = 2, Name = "RFID Мітки", Quantity = 8, ZoneId = 1, LastUpdated = DateTime.UtcNow }
        );
    }
}