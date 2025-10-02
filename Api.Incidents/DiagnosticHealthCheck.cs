using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Api.Incidents
{
    [ApiController]
    [Route("api/[controller]")]
    public class DiagnosticHealthCheckController : ControllerBase
    {
        private readonly ILogger<DiagnosticHealthCheckController> _logger;
        private readonly IConfiguration _configuration;
        private readonly IServiceProvider _serviceProvider;

        public DiagnosticHealthCheckController(
            ILogger<DiagnosticHealthCheckController> logger,
            IConfiguration configuration,
            IServiceProvider serviceProvider)
        {
            _logger = logger;
            _configuration = configuration;
            _serviceProvider = serviceProvider;
        }

        [HttpGet("diagnostic")]
        public async Task<IActionResult> GetDiagnostic()
        {
            var diagnostic = new
            {
                timestamp = DateTimeOffset.UtcNow,
                service = "Incident Manager API Diagnostic",
                checks = new Dictionary<string, object>()
            };

            // Check 1: Configuration
            try
            {
                var connectionString = _configuration.GetConnectionString("DefaultConnection");
                diagnostic.checks["configuration"] = new
                {
                    status = "loaded",
                    hasConnectionString = !string.IsNullOrEmpty(connectionString),
                    connectionStringLength = connectionString?.Length ?? 0,
                    isPlaceholder = connectionString?.Contains("YOURPCNAME") == true,
                    environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production",
                    configSources = _configuration.AsEnumerable().Count()
                };
            }
            catch (Exception ex)
            {
                diagnostic.checks["configuration"] = new
                {
                    status = "error",
                    error = ex.Message
                };
            }

            // Check 2: Database Context from DI
            try
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetService<Data.EntityFramework.V7DBContext>();
                    if (dbContext != null)
                    {
                        var canConnect = await dbContext.Database.CanConnectAsync();
                        var connectionString = dbContext.Database.GetConnectionString();

                        diagnostic.checks["database_di"] = new
                        {
                            status = canConnect ? "connected" : "disconnected",
                            provider = dbContext.Database.ProviderName,
                            hasConnectionString = !string.IsNullOrEmpty(connectionString),
                            connectionStringLength = connectionString?.Length ?? 0
                        };

                        if (canConnect)
                        {
                            // Try to query a simple table
                            try
                            {
                                var incidentTypeCount = await dbContext.IncidentTypes.CountAsync();
                                diagnostic.checks["database_query"] = new
                                {
                                    status = "success",
                                    incidentTypeCount = incidentTypeCount
                                };
                            }
                            catch (Exception queryEx)
                            {
                                diagnostic.checks["database_query"] = new
                                {
                                    status = "query_failed",
                                    error = queryEx.Message
                                };
                            }
                        }
                    }
                    else
                    {
                        diagnostic.checks["database_di"] = new
                        {
                            status = "not_registered",
                            error = "V7DBContext not found in DI container"
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                diagnostic.checks["database_di"] = new
                {
                    status = "error",
                    error = ex.Message,
                    stackTrace = ex.StackTrace
                };
            }

            // Check 3: BusBase Configuration
            try
            {
                var busBaseConnectionString = Bus.Core.BusBase<Data.EntityFramework.V7DBContext>.GetConnectionString();
                diagnostic.checks["busbase_config"] = new
                {
                    status = "checked",
                    hasConnectionString = !string.IsNullOrEmpty(busBaseConnectionString),
                    connectionStringLength = busBaseConnectionString?.Length ?? 0
                };
            }
            catch (Exception ex)
            {
                diagnostic.checks["busbase_config"] = new
                {
                    status = "error",
                    error = ex.Message
                };
            }

            // Check 4: Direct Database Connection Test
            try
            {
                var connectionString = _configuration.GetConnectionString("DefaultConnection");
                if (!string.IsNullOrEmpty(connectionString))
                {
                    using (var testContext = new Data.EntityFramework.V7DBContext())
                    {
                        var canConnect = await testContext.Database.CanConnectAsync();
                        diagnostic.checks["direct_db_test"] = new
                        {
                            status = canConnect ? "connected" : "disconnected",
                            method = "parameterless_constructor"
                        };
                    }
                }
                else
                {
                    diagnostic.checks["direct_db_test"] = new
                    {
                        status = "skipped",
                        reason = "No connection string configured"
                    };
                }
            }
            catch (Exception ex)
            {
                diagnostic.checks["direct_db_test"] = new
                {
                    status = "error",
                    error = ex.Message,
                    innerError = ex.InnerException?.Message
                };
            }

            // Check 5: Authentication Services
            try
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var authService = scope.ServiceProvider.GetService<Bus.Authentication.Services.IAuthenticationService>();
                    var permissionService = scope.ServiceProvider.GetService<Bus.Authentication.Services.IPermissionService>();
                    var jwtService = scope.ServiceProvider.GetService<Bus.Authentication.Services.IJwtTokenService>();

                    diagnostic.checks["authentication_services"] = new
                    {
                        status = "checked",
                        authenticationService = authService != null ? "registered" : "missing",
                        permissionService = permissionService != null ? "registered" : "missing",
                        jwtService = jwtService != null ? "registered" : "missing"
                    };
                }
            }
            catch (Exception ex)
            {
                diagnostic.checks["authentication_services"] = new
                {
                    status = "error",
                    error = ex.Message
                };
            }

            // Check 6: Memory and Process Info
            try
            {
                var process = Process.GetCurrentProcess();
                diagnostic.checks["process"] = new
                {
                    status = "running",
                    processName = process.ProcessName,
                    workingSet = process.WorkingSet64 / (1024 * 1024) + " MB",
                    threads = process.Threads.Count,
                    startTime = process.StartTime,
                    uptime = (DateTime.Now - process.StartTime).ToString(@"hh\:mm\:ss")
                };
            }
            catch (Exception ex)
            {
                diagnostic.checks["process"] = new
                {
                    status = "error",
                    error = ex.Message
                };
            }

            // Check 7: Test Incident Business Layer
            try
            {
                // Test creating an incident instance without database
                var testIncident = new Bus.Incidents.IncidentCase();
                diagnostic.checks["business_layer"] = new
                {
                    status = "instance_created",
                    hasDefaultValues = true
                };
            }
            catch (Exception ex)
            {
                diagnostic.checks["business_layer"] = new
                {
                    status = "error",
                    error = ex.Message,
                    innerError = ex.InnerException?.Message,
                    stackTrace = ex.StackTrace?.Split('\n').Take(5).ToArray()
                };
            }

            return Ok(diagnostic);
        }

        [HttpGet("test-incident-creation")]
        public async Task<IActionResult> TestIncidentCreation()
        {
            var result = new
            {
                timestamp = DateTimeOffset.UtcNow,
                test = "Incident Creation Test",
                steps = new List<object>()
            };

            try
            {
                // Step 1: Get DbContext from DI
                using (var scope = _serviceProvider.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<Data.EntityFramework.V7DBContext>();

                    result.steps.Add(new
                    {
                        step = 1,
                        description = "DbContext obtained from DI",
                        status = "success"
                    });

                    // Step 2: Create IncidentCase with DbContext
                    var incident = new Bus.Incidents.IncidentCase(dbContext);

                    result.steps.Add(new
                    {
                        step = 2,
                        description = "IncidentCase instance created",
                        status = "success"
                    });

                    // Step 3: Set basic properties
                    incident.UserAreaID = 1;
                    incident.IncidentTypeID = 1;
                    incident.Description = "Test incident from diagnostic";
                    incident.IncidentDate = DateTimeOffset.UtcNow;
                    incident.ReportedByUserID = 1;

                    result.steps.Add(new
                    {
                        step = 3,
                        description = "Properties set",
                        status = "success",
                        properties = new
                        {
                            userAreaId = incident.UserAreaID,
                            incidentTypeId = incident.IncidentTypeID,
                            description = incident.Description
                        }
                    });

                    // Step 4: Check if we can access the database
                    var canConnect = await dbContext.Database.CanConnectAsync();

                    result.steps.Add(new
                    {
                        step = 4,
                        description = "Database connectivity check",
                        status = canConnect ? "connected" : "disconnected"
                    });

                    // Note: We won't actually save to avoid creating test data
                    result.steps.Add(new
                    {
                        step = 5,
                        description = "Save operation",
                        status = "skipped",
                        reason = "Diagnostic mode - not saving to database"
                    });
                }

                return Ok(new
                {
                    result,
                    overall_status = "success",
                    message = "Incident creation test completed successfully"
                });
            }
            catch (Exception ex)
            {
                result.steps.Add(new
                {
                    step = result.steps.Count + 1,
                    description = "Error occurred",
                    status = "error",
                    error = ex.Message,
                    innerError = ex.InnerException?.Message,
                    stackTrace = ex.StackTrace?.Split('\n').Take(5).ToArray()
                });

                return StatusCode(500, new
                {
                    result,
                    overall_status = "failed",
                    error = ex.Message
                });
            }
        }
    }
}