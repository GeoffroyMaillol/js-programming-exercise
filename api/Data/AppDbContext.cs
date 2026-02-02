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

    /// <summary>
    /// Enforce uniqueness of First Name / Last Name pairs and email.
    /// Those 3 columns are also required to be non-empty.
    /// </summary>
    /// <param name="modelBuilder">the model builder</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserData>()
            .Property(u => u.FirstName)
            .IsRequired();
        modelBuilder.Entity<UserData>()
            .Property(u => u.LastName)
            .IsRequired();
        modelBuilder.Entity<UserData>()
            .Property(u => u.Email)
            .IsRequired();

        modelBuilder.Entity<UserData>().ToTable(t =>
            {
                t.HasCheckConstraint("CK_User_FirstName_NotEmpty", "FirstName <> ''");
            });
        modelBuilder.Entity<UserData>().ToTable(t =>
            {
                t.HasCheckConstraint("CK_User_LastName_NotEmpty", "LastName <> ''");
            });
        modelBuilder.Entity<UserData>().ToTable(t =>
            {
                t.HasCheckConstraint("CK_User_Email_NotEmpty", "Email <> ''");
            });
        
        modelBuilder.Entity<UserData>()
            .HasIndex(u => new { u.Email })
            .IsUnique();

        base.OnModelCreating(modelBuilder);
    }

}
