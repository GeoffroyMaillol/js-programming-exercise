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
        // Should use pagination for a lot of user, but overkill right now. 
        group.MapGet("/", async (AppDbContext db) =>
            await db.UserData.ToListAsync());

        group.MapGet("/{id:int}", async (int id, AppDbContext db) =>
            await db.UserData.FindAsync(id) is UserData p ? Results.Ok(p) : Results.NotFound());

        group.MapPost("/", AddUserData);
        group.MapPut("/{id:int}", UpdateUserData);
        group.MapDelete("/{id:int}", DeleteUserData);
        group.MapGet("/search", SearchUserData);
    }

    static async Task<IResult> SearchUserData(string query, AppDbContext db)
    {
        if (string.IsNullOrWhiteSpace(query))
            return Results.BadRequest("Query cannot be empty");

        var lower = query.ToLower();
        // LINQ should be safe to injection vulnerabilities
        var userData = await db.UserData
            .Where(u =>
                u.FirstName.ToLower().Contains(lower) ||
                u.LastName.ToLower().Contains(lower))
            .ToListAsync();

        return Results.Ok(userData);
    }

    static async Task<IResult> AddUserData(UserData userData, AppDbContext db)
    {
        try
        {
            db.UserData.Add(userData);
            await db.SaveChangesAsync();
            return Results.Created($"/api/users/{userData.Id}", userData);
        }
        catch (DbUpdateException ex)
        {
            var message = ex.InnerException?.Message ?? ex.Message;
            if (message.Contains("UNIQUE constraint failed"))
            {
                return Results.Conflict(new {
                    success = false,
                    message = "A user with the same first and last name or email already exists"
                });
            }
            if (message.Contains("CHECK constraint failed") || message.Contains("NOT NULL constraint failed"))
            {
                return Results.BadRequest(new {
                    success = false,
                    message = "Required fields are missing"
                });
            }

            return Results.Problem("An unexpected database error occurred");
        }
    }
    
    static async Task<IResult> UpdateUserData(int id, UserData input, AppDbContext db)
    {
        var product = await db.UserData.FindAsync(id);
        if (product is null) return Results.NotFound();

        db.Entry(product).CurrentValues.SetValues(input);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    static async Task<IResult> DeleteUserData(int id, AppDbContext db)
    {
        var userData = await db.UserData.FindAsync(id);
            if (userData is null) return Results.NotFound();

            db.UserData.Remove(userData);
            await db.SaveChangesAsync();
            return Results.NoContent();
    }
}
