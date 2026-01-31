using Microsoft.EntityFrameworkCore;
using UserDataApi.Data;
using UserDataApi.Config;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<SpaConfig>(
    builder.Configuration.GetSection("SpaConfig")
);
var spaConfig = builder.Configuration.GetSection("SpaConfig").Get<SpaConfig>();

builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=app.db"));
builder.Services.AddCors(options =>
{
    // Minimal security here, for the purpose of the exercise. May need to be more restrictive for an actual application.
    options.AddPolicy("spa_permissions", policy =>
    {
        policy.WithOrigins(spaConfig.HostUrl)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors("spa_permissions");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Run database migrations and initialise data if required
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
    DbInitialiser.Seed(db);
}

app.MapProductEndpoints();
app.Run();
