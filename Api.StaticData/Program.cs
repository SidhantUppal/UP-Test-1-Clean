
using Microsoft.EntityFrameworkCore;
using Bus.Authentication.Extensions;

namespace Api.StaticData
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddDbContext<Data.EntityFramework.V7DBContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Configure BusBase with IConfiguration
            Bus.Core.BusBase<Data.EntityFramework.V7DBContext>.SetConfiguration(builder.Configuration);

            // Add custom authentication
            builder.Services.AddCustomAuthentication(builder.Configuration);

            // Add Entity Framework repositories
            builder.Services.AddEntityFrameworkAuthenticationRepositories();

            // Add memory cache for permission service
            builder.Services.AddMemoryCache();

            // Add CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                {
                    policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
                          .WithHeaders("authorization", "content-type", "accept", "origin", "x-requested-with", "x-user-id", "x-user-area-id", "x-csrf-token")
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
            });

            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    // Use PascalCase for JSON property names to match database schema exactly (database-first approach)
                    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                    options.JsonSerializerOptions.PropertyNamingPolicy = null;
                });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme",
                    Name = "Authorization",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT"
                });

                c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
                {
                    {
                        new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                        {
                            Reference = new Microsoft.OpenApi.Models.OpenApiReference
                            {
                                Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Use HTTPS redirection only in production
            if (!app.Environment.IsDevelopment())
            {
                app.UseHttpsRedirection();
            }

            // Enable CORS
            app.UseCors("AllowFrontend");

            // Cookie-to-JWT middleware for cookie-based authentication
            app.Use(async (context, next) =>
            {
                var hasAuthHeader = context.Request.Headers.ContainsKey("Authorization");
                var hasCookie = context.Request.Cookies.TryGetValue("auth-token", out var token);

                Console.WriteLine($"[AUTH DEBUG] {context.Request.Method} {context.Request.Path}");
                Console.WriteLine($"[AUTH DEBUG] Has Authorization header: {hasAuthHeader}");
                Console.WriteLine($"[AUTH DEBUG] Has auth-token cookie: {hasCookie}");
                Console.WriteLine($"[AUTH DEBUG] Cookie value: {(hasCookie ? $"{token?.Substring(0, Math.Min(10, token?.Length ?? 0))}..." : "none")}");

                if (!hasAuthHeader && hasCookie)
                {
                    context.Request.Headers["Authorization"] = $"Bearer {token}";
                    Console.WriteLine("[AUTH DEBUG] Added Authorization header from cookie");
                }

                await next();
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
