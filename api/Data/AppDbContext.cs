using Microsoft.EntityFrameworkCore;
using UserDataApi.Models;

namespace UserDataApi.Data;

/// <summary>
/// Implementation of the DbContext for this API.
/// </summary>
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<UserData> UserData => Set<UserData>();
}
