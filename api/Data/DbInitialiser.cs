using CsvHelper;
using System.Globalization;
using UserDataApi.Models;

namespace UserDataApi.Data;

/// <summary>
/// Initialises database if it's empty.
/// </summary>
public static class DbInitialiser
{
    public static void Seed(AppDbContext db)
    {
        if (db.UserData.Any())
            return; // Data exists, so do not override it.

        using var reader = new StreamReader("Data/InitialData.csv");
        using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
        csv.Context.RegisterClassMap<UserDataMap>();
        
        var records = csv.GetRecords<UserData>().ToList();
        db.UserData.AddRange(records);
        db.SaveChanges();
    }
}
