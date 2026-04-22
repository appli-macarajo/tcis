var builder = WebApplication.CreateBuilder(args);

// 1. Add CORS Policy (Crucial for your React frontend in VS Code)
builder.Services.AddCors(options =>
{
    options.AddPolicy("TCIS_Policy",
        policy => policy.WithOrigins("http://localhost:5173") // Default Vite port
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// 2. Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 3. Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 4. Enable CORS (Must be placed before MapControllers)
app.UseCors("TCIS_Policy");

app.UseAuthorization();

// 5. Map Controller routes
app.MapControllers();

app.Run();