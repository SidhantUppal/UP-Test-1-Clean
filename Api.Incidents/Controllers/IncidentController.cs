using Bus.Authentication.Authorization;
using Bus.Authentication.Controllers;
using Bus.Core.Enums;
using Bus.Core.Filtering;
using Bus.Incidents;
using Data.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Api.Incidents.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IncidentController : AuthenticatedControllerBase
    {
        private readonly ILogger<IncidentController> _logger;
        private readonly IServiceProvider _serviceProvider;
        private readonly IConfiguration _configuration;

        public IncidentController(
            ILogger<IncidentController> logger,
            IServiceProvider serviceProvider,
            IConfiguration configuration)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
            _configuration = configuration;
        }

        [HttpGet("health")]
        [AllowAnonymous]
        public async Task<IActionResult> Health()
        {
            var health = new
            {
                status = "healthy",
                service = "Incident Manager API",
                timestamp = DateTimeOffset.UtcNow,
                checks = new Dictionary<string, object>()
            };

            try
            {
                // Test database connection using DI
                using (var scope = _serviceProvider.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetService<Data.EntityFramework.V7DBContext>();
                    if (dbContext != null)
                    {
                        var canConnect = await dbContext.Database.CanConnectAsync();
                        health.checks["database"] = new
                        {
                            status = canConnect ? "connected" : "disconnected",
                            provider = dbContext.Database.ProviderName
                        };
                    }
                    else
                    {
                        // Fallback to creating directly if not in DI
                        using (var directDbContext = new Data.EntityFramework.V7DBContext())
                        {
                            var canConnect = await directDbContext.Database.CanConnectAsync();
                            health.checks["database"] = new
                            {
                                status = canConnect ? "connected" : "disconnected",
                                provider = directDbContext.Database.ProviderName,
                                method = "direct_creation"
                            };
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                health.checks["database"] = new
                {
                    status = "error",
                    message = ex.Message,
                    innerException = ex.InnerException?.Message
                };
            }

            // Check configuration
            if (_configuration != null)
            {
                var connectionString = _configuration.GetConnectionString("DefaultConnection");
                health.checks["configuration"] = new
                {
                    status = "loaded",
                    hasConnectionString = !string.IsNullOrEmpty(connectionString),
                    connectionStringConfigured = connectionString?.Contains("YOURPCNAME") == false
                };
            }

            return Ok(health);
        }

        #region Create

        [HttpPost]
        [RequirePermission(Permission.INCIDENT_CREATE)]
        public async Task<IActionResult> CreateIncident([FromBody] IncidentCaseViewModel request)
        {
            try
            {
                // Validate required fields
                if (request.UserAreaID <= 0)
                {
                    return BadRequest(new { error = "UserAreaID is required and must be greater than 0" });
                }

                if (request.IncidentTypeID <= 0)
                {
                    return BadRequest(new { error = "IncidentTypeID is required and must be greater than 0" });
                }

                // Create incident using DbContext from dependency injection
                IncidentCase incident;
                using (var scope = _serviceProvider.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<Data.EntityFramework.V7DBContext>();
                    incident = new IncidentCase(dbContext);

                    // Map properties from view model
                    incident.UserAreaID = request.UserAreaID;
                    incident.IncidentTypeID = request.IncidentTypeID;
                    incident.IncidentDate = request.IncidentDate;
                    incident.ReportedDate = request.ReportedDate ?? DateTimeOffset.UtcNow;
                    incident.LocationID = request.LocationID;
                    incident.Description = request.Description;
                    incident.Severity = request.IncidentSeverityTypeID;
                    incident.IncidentStatusType = request.IncidentStatusTypeID ?? (int)Bus.Core.Enums.IncidentStatusType.Open;
                    incident.IncidentPriorityTypeID = request.IncidentPriorityTypeID;
                    incident.ReportedByUserID = request.ReportedByUserID > 0 ? request.ReportedByUserID : UserSession.UserId;
                    incident.AssignedToUserID = request.AssignedToUserID;
                    incident.AdditionalReference = request.AdditionalReference;

                    var incidentId = await incident.SaveAndReturnAsync(UserSession.UserId);
                    var createdIncident = incident.GetViewModel();

                    return CreatedAtAction(nameof(GetIncidentById), new { id = incidentId }, createdIncident);
                }
            }
            catch (InvalidOperationException ioe)
            {
                _logger.LogError(ioe, "Configuration or database connection error: {Message}", ioe.Message);
                return StatusCode(500, new {
                    error = "Database connection error",
                    details = ioe.Message,
                    hint = "Please check the database connection string in appsettings.json"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating incident: {Message}", ex.Message);
                _logger.LogError(ex, "Stack trace: {StackTrace}", ex.StackTrace);
                return StatusCode(500, new {
                    error = "Internal server error",
                    details = ex.Message,
                    type = ex.GetType().Name
                });
            }
        }


        #endregion

        #region Read

        [HttpGet]
        [RequirePermission(Permission.INCIDENT_VIEW)]
        public async Task<IActionResult> GetAllIncidents([FromQuery] IncidentFilterViewModel filters)
        {
            try
            {
                // Get all incidents
                var incidents = await IncidentCase.GetAllIncidentsAsync(UserSession.MasterUserAreaID);

                // Apply centralized filtering using Bus.Core extensions
                var result = incidents.AsQueryable().ToPaginatedResult(filters);

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving incidents with filters: {@Filters}", filters);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        [RequirePermission(Permission.INCIDENT_VIEW)]
        public async Task<IActionResult> GetIncidentById(int id, [FromQuery] int userAreaId = 0)
        {
            try
            {
                IncidentCaseViewModel? incident = null;

                if (userAreaId > 0)
                {
                    incident = await IncidentCase.GetIncidentByIdAsync(id, userAreaId);
                }
                else
                {
                    // Find the incident in any user area using Bus layer
                    var incidentInfo = await IncidentCase.GetIncidentInfoAsync(id);
                    if (incidentInfo.HasValue)
                    {
                        incident = await IncidentCase.GetIncidentByIdAsync(id, incidentInfo.Value.UserAreaID);
                    }
                }

                if (incident == null)
                {
                    return NotFound($"Incident with ID {id} not found");
                }
                return Ok(incident);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving incident with ID {IncidentId}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("status/{status}")]
        [RequirePermission(Permission.INCIDENT_VIEW)]
        public async Task<IActionResult> GetIncidentsByStatus(int status, [FromQuery] int? userAreaId = null)
        {
            try
            {
                var incidents = await IncidentCase.GetIncidentsByStatusAsync(status, userAreaId);
                return Ok(incidents);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving incidents by status {Status}", status);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("incomplete")]
        [RequirePermission(Permission.INCIDENT_VIEW)]
        public async Task<IActionResult> GetIncompleteIncidents([FromQuery] int? userAreaId = null)
        {
            try
            {
                var incidents = await IncidentCase.GetIncidentsByStatusAsync((int)IncidentStatusType.Open, userAreaId);
                return Ok(incidents);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving incomplete incidents");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("stats")]
        [RequirePermission(Permission.INCIDENT_VIEW_STATS)]
        public async Task<IActionResult> GetIncidentStats([FromQuery] int? userAreaId = null)
        {
            try
            {
                var allIncidents = await IncidentCase.GetAllIncidentsAsync(userAreaId);

                var stats = new
                {
                    Total = allIncidents.Count,
                    Open = allIncidents.Count(i => i.IncidentStatusTypeID == (int)IncidentStatusType.Open),
                    InProgress = allIncidents.Count(i => i.IncidentStatusTypeID == (int)IncidentStatusType.Open),
                    Closed = allIncidents.Count(i => i.IncidentStatusTypeID == (int)IncidentStatusType.Open),
                    BySeverity = allIncidents.GroupBy(i => i.IncidentSeverityTypeID ?? (int)IncidentSeverityType.Unknown)
                        .Select(g => new { Severity = g.Key, Count = g.Count() }),
                    ByPriority = allIncidents.GroupBy(i => i.IncidentPriorityTypeID ?? (int)IncidentPriorityType.Unknown)
                        .Select(g => new { Priority = g.Key, Count = g.Count() })
                };

                return Ok(stats);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving incident stats");
                return StatusCode(500, "Internal server error");
            }
        }

        #endregion

        #region Update

        [HttpPut("{id}")]
        [RequirePermission(Permission.INCIDENT_EDIT)]
        public async Task<IActionResult> UpdateIncident(int id, [FromBody] IncidentCaseViewModel request)
        {
            try
            {
                // Ensure the IncidentCaseID matches the route parameter
                request.IncidentCaseID = id;

                var incident = new IncidentCase(request);
                await incident.SaveAsync(UserSession.UserId);
                var updatedIncident = incident.GetViewModel();

                return Ok(updatedIncident);
            }
            catch (InvalidOperationException)
            {
                return NotFound($"Incident with ID {id} not found");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating incident with ID {IncidentId}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("{id}/close")]
        [RequirePermission(Permission.INCIDENT_CLOSE)]
        public async Task<IActionResult> CloseIncident(int id, [FromBody] CloseIncidentRequest request)
        {
            try
            {
                // Find the incident first to get userAreaId using Bus layer
                var incidentInfo = await IncidentCase.GetIncidentInfoAsync(id);
                if (!incidentInfo.HasValue)
                {
                    return NotFound($"Incident with ID {id} not found");
                }

                var incident = new IncidentCase(id, incidentInfo.Value.UserAreaID);
                await incident.CloseAsync(UserSession.UserId, request.ClosureNotes ?? "");
                var closedIncident = incident.GetViewModel();

                return Ok(closedIncident);
            }
            catch (InvalidOperationException)
            {
                return NotFound($"Incident with ID {id} not found");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error closing incident with ID {IncidentId}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        #endregion

        #region Delete

        [HttpDelete("{id}")]
        [RequirePermission(Permission.INCIDENT_DELETE)]
        public async Task<IActionResult> ArchiveIncident(int id)
        {
            try
            {
                // Find the incident first to get userAreaId using Bus layer
                var incidentInfo = await IncidentCase.GetIncidentInfoAsync(id);
                if (!incidentInfo.HasValue)
                {
                    return NotFound($"Incident with ID {id} not found");
                }

                var incident = new IncidentCase(id, incidentInfo.Value.UserAreaID);
                await incident.ArchiveAsync(UserSession.UserId);
                var archivedIncident = incident.GetViewModel();

                return Ok(archivedIncident);
            }
            catch (InvalidOperationException)
            {
                return NotFound($"Incident with ID {id} not found");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error archiving incident with ID {IncidentId}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        #endregion

        #region Lookup Data

        [HttpGet("severities")]
        [RequirePermission(Permission.INCIDENT_VIEW)]
        public async Task<IActionResult> GetIncidentSeverities()
        {
            try
            {
                // This will be implemented based on your data access pattern
                var severities = await IncidentCase.GetIncidentSeveritiesAsync();
                return Ok(new { data = severities });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving incident severities");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("statuses")]
        [RequirePermission(Permission.INCIDENT_VIEW)]
        public async Task<IActionResult> GetIncidentStatuses()
        {
            try
            {
                var statuses = await IncidentCase.GetIncidentStatusesAsync();
                return Ok(new { data = statuses });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving incident statuses");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("priorities")]
        [RequirePermission(Permission.INCIDENT_VIEW)]
        public async Task<IActionResult> GetIncidentPriorities()
        {
            try
            {
                var priorities = await IncidentCase.GetIncidentPrioritiesAsync();
                return Ok(new { data = priorities });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving incident priorities");
                return StatusCode(500, "Internal server error");
            }
        }

        #endregion
    }

    public class CloseIncidentRequest
    {
        public string? ClosureNotes { get; set; }
    }

}