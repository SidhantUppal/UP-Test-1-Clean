
using Bus.Authentication.Extensions;
using Data.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace Api.SysAdmin
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add Entity Framework DbContext (same as Api.Tasks)
            builder.Services.AddDbContext<V7DBContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Configure BusBase with IConfiguration (same as Api.Tasks)
            Bus.Core.BusBase<V7DBContext>.SetConfiguration(builder.Configuration);

            // Add custom authentication services
            builder.Services.AddCustomAuthentication(builder.Configuration);

            // Add Entity Framework repositories
            builder.Services.AddEntityFrameworkAuthenticationRepositories();

            // Add Antiforgery for CSRF protection
            builder.Services.AddAntiforgery(options =>
            {
                options.HeaderName = "X-CSRF-TOKEN";
                options.Cookie.HttpOnly = true;
                options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
                options.Cookie.SameSite = SameSiteMode.Strict;
            });

            // Add CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                {
                    policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
                          .WithHeaders("authorization", "content-type", "accept", "origin", "x-requested-with", "x-csrf-token")
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
            });

            // Add memory cache for permission service
            builder.Services.AddMemoryCache();

            // Add services to the container.
            builder.Services.AddControllers();
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

            app.UseHttpsRedirection();

            // Enable CORS
            app.UseCors("AllowFrontend");

            // Cookie to JWT header middleware - must be before UseAuthentication
            app.Use(async (context, next) =>
            {
                // Read JWT from cookie and add to Authorization header if not already present
                if (!context.Request.Headers.ContainsKey("Authorization") &&
                    context.Request.Cookies.TryGetValue("auth-token", out var token))
                {
                    context.Request.Headers["Authorization"] = $"Bearer {token}";
                }

                await next();
            });

            // Authentication & Authorization middleware
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
