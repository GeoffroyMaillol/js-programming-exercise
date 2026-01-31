using Microsoft.EntityFrameworkCore;
using UserDataApi.Data;
using UserDataApi.Models;

/// <summary>
/// Defines the API endpoints for Users.
/// </summary>
public static class UserDataEndpoints
{
    public static void MapProductEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/users");

        group.MapGet("/", async (AppDbContext db) =>
            await db.UserData.ToListAsync());

        group.MapGet("/{id:int}", async (int id, AppDbContext db) =>
            await db.UserData.FindAsync(id) is UserData p ? Results.Ok(p) : Results.NotFound());

        group.MapPost("/", async (UserData userData, AppDbContext db) =>
        {
            db.UserData.Add(userData);
            await db.SaveChangesAsync();
            return Results.Created($"/api/users/{userData.Id}", userData);
        });

        group.MapPut("/{id:int}", async (int id, UserData input, AppDbContext db) =>
        {
            var product = await db.UserData.FindAsync(id);
            if (product is null) return Results.NotFound();

            db.Entry(product).CurrentValues.SetValues(input);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        group.MapDelete("/{id:int}", async (int id, AppDbContext db) =>
        {
            var userData = await db.UserData.FindAsync(id);
            if (userData is null) return Results.NotFound();

            db.UserData.Remove(userData);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
    }
}
