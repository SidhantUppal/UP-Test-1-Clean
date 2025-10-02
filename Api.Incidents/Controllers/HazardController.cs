using Bus.Authentication.Authorization;
using Bus.Authentication.Controllers;
using Bus.Core.Enums;
using Bus.Core.Filtering;
using Bus.Incidents;
using Data.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Incidents.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HazardController : AuthenticatedControllerBase
    {
        private readonly ILogger<HazardController> _logger;

        public HazardController(ILogger<HazardController> logger)
        {
            _logger = logger;
        }

        [HttpGet("health")]
        [AllowAnonymous]
        public IActionResult Health()
        {
            return Ok("Hazard Manager API is healthy");
        }

        #region Create

        [HttpPost]
        [RequirePermission(Permission.HAZARD_CREATE)]
        public async Task<IActionResult> CreateHazard([FromBody] HazardViewModel request)
        {
            try
            {
                var hazard = new Hazard(request);
                var hazardId = await hazard.SaveAndReturnAsync(UserSession.UserId);
                var createdHazard = hazard.GetViewModel();

                return CreatedAtAction(nameof(GetHazardById), new { id = hazardId }, createdHazard);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating hazard: {Message}", ex.Message);
                _logger.LogError(ex, "Full exception: {Exception}", ex.ToString());
                return StatusCode(500, new { error = "Internal server error", details = ex.Message });
            }
        }

        #endregion

        #region Read

        [HttpGet]
        [RequirePermission(Permission.HAZARD_VIEW)]
        public async Task<IActionResult> GetAllHazards([FromQuery] HazardFilterViewModel filters)
        {
            try
            {
                // Always use the authenticated user's MasterUserAreaID for security
                var hazards = await Hazard.GetAllHazardsAsync(UserSession.MasterUserAreaID);

                // Apply centralized filtering using Bus.Core extensions
                var result = hazards.AsQueryable().ToPaginatedResult(filters);

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving hazards with filters: {@Filters}", filters);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        [RequirePermission(Permission.HAZARD_VIEW)]
        public async Task<IActionResult> GetHazardById(int id)
        {
            try
            {
                // Always use the authenticated user's MasterUserAreaID for security
                var hazard = await Hazard.GetHazardByIdAsync(id, UserSession.MasterUserAreaID);

                if (hazard == null)
                {
                    return NotFound($"Hazard with ID {id} not found");
                }
                return Ok(hazard);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving hazard with ID {HazardId}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("stats")]
        [RequirePermission(Permission.HAZARD_VIEW_STATS)]
        public async Task<IActionResult> GetHazardStats([FromQuery] int? userAreaId = null)
        {
            try
            {
                var allHazards = await Hazard.GetAllHazardsAsync(userAreaId);

                var stats = new
                {
                    Total = allHazards.Count,
                    Active = allHazards.Count(h => h.IsActive == true),
                    Archived = allHazards.Count(h => h.IsActive == false),
                    BySeverity = allHazards.GroupBy(h => h.HazardSeverityTypeID ?? 0)
                        .Select(g => new { SeverityTypeId = g.Key, Count = g.Count() }),
                    ByRiskScore = allHazards.GroupBy(h => h.InherentRiskScore ?? 0)
                        .Select(g => new { RiskScore = g.Key, Count = g.Count() })
                };

                return Ok(stats);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving hazard stats");
                return StatusCode(500, "Internal server error");
            }
        }

        #endregion

        #region Update

        [HttpPut("{id}")]
        [RequirePermission(Permission.HAZARD_EDIT)]
        public async Task<IActionResult> UpdateHazard(int id, [FromBody] HazardViewModel request)
        {
            try
            {
                // Ensure the HazardID matches the route parameter
                request.HazardID = id;

                var hazard = new Hazard(request);
                await hazard.SaveAsync(UserSession.UserId);
                var updatedHazard = hazard.GetViewModel();

                return Ok(updatedHazard);
            }
            catch (InvalidOperationException)
            {
                return NotFound($"Hazard with ID {id} not found");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating hazard with ID {HazardId}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        #endregion

        #region Delete

        [HttpDelete("{id}")]
        [RequirePermission(Permission.HAZARD_DELETE)]
        public async Task<IActionResult> ArchiveHazard(int id, [FromBody] ArchiveHazardRequest request)
        {
            try
            {
                // For now, require userAreaId in the request body
                if (request.UserAreaId <= 0)
                {
                    return BadRequest("UserAreaId is required");
                }

                var hazard = new Hazard(id, request.UserAreaId);
                await hazard.ArchiveAsync(UserSession.UserId);
                var archivedHazard = hazard.GetViewModel();

                return Ok(archivedHazard);
            }
            catch (InvalidOperationException)
            {
                return NotFound($"Hazard with ID {id} not found");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error archiving hazard with ID {HazardId}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        #endregion

        #region Lookup Data

        [HttpGet("severities")]
        [RequirePermission(Permission.HAZARD_VIEW)]
        public async Task<IActionResult> GetHazardSeverities()
        {
            try
            {
                // This will use the HazardSeverityType lookup table
                var severities = await Hazard.GetHazardSeveritiesAsync();
                return Ok(new { data = severities });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving hazard severities");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("categories")]
        [RequirePermission(Permission.HAZARD_VIEW)]
        public async Task<IActionResult> GetHazardCategories([FromQuery] int? userAreaId = null)
        {
            try
            {
                var categories = await Hazard.GetHazardCategoriesAsync(userAreaId);
                return Ok(new { data = categories });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving hazard categories");
                return StatusCode(500, "Internal server error");
            }
        }

        #endregion
    }

    public class ArchiveHazardRequest
    {
        public int UserAreaId { get; set; }
    }
}