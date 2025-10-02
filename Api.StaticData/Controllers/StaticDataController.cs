using Bus.Authentication.Controllers;
using Bus.StaticData;
using Data.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.StaticData.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StaticDataController : AuthenticatedControllerBase
    {
        private readonly ILogger<StaticDataController> _logger;

        public StaticDataController(ILogger<StaticDataController> logger)
        {
            _logger = logger;
        }

        [HttpGet("health")]
        [AllowAnonymous]
        public IActionResult Health()
        {
            return Ok("Static Data API is healthy");
        }
 
        

        

        

        

        

        

        [HttpGet("absence-approval-types")]
        public async Task<IActionResult> GetAbsenceApprovalTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var absenceApprovalTypes = await staticData.GetAbsenceApprovalTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = absenceApprovalTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving absenceapprovaltypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("absence-duration-types")]
        public async Task<IActionResult> GetAbsenceDurationTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var absenceDurationTypes = await staticData.GetAbsenceDurationTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = absenceDurationTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving absencedurationtypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("alert-types")]
        public async Task<IActionResult> GetAlertTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var alertTypes = await staticData.GetAlertTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = alertTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving alerttypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("api-keys")]
        public async Task<IActionResult> GetApiKeys()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var apiKeys = await staticData.GetApiKeysAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = apiKeys });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving apikeys");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("asset-status-types")]
        public async Task<IActionResult> GetAssetStatusTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var assetStatusTypes = await staticData.GetAssetStatusTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = assetStatusTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving assetstatustypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("b-s-s-time-zones")]
        public async Task<IActionResult> GetBSSTimeZones()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var bSSTimeZones = await staticData.GetBSSTimeZonesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = bSSTimeZones });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving bsstimezones");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("competencies")]
        public async Task<IActionResult> GetCompetencies()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var competencies = await staticData.GetCompetenciesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = competencies });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving competencies");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("employee-types")]
        public async Task<IActionResult> GetEmployeeTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var employeeTypes = await staticData.GetEmployeeTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = employeeTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving employeetypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("frequency-types")]
        public async Task<IActionResult> GetFrequencyTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var frequencyTypes = await staticData.GetFrequencyTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = frequencyTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving frequencytypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("hazard-category-types")]
        public async Task<IActionResult> GetHazardCategoryTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var hazardCategoryTypes = await staticData.GetHazardCategoryTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = hazardCategoryTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving hazardcategorytypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("hazard-severity-types")]
        public async Task<IActionResult> GetHazardSeverityTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var hazardSeverityTypes = await staticData.GetHazardSeverityTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = hazardSeverityTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving hazardseveritytypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("incident-category-types")]
        public async Task<IActionResult> GetIncidentCategoryTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var incidentCategoryTypes = await staticData.GetIncidentCategoryTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = incidentCategoryTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving incidentcategorytypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("incident-priority-types")]
        public async Task<IActionResult> GetIncidentPriorityTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var incidentPriorityTypes = await staticData.GetIncidentPriorityTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = incidentPriorityTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving incidentprioritytypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("incident-severity-types")]
        public async Task<IActionResult> GetIncidentSeverityTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var incidentSeverityTypes = await staticData.GetIncidentSeverityTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = incidentSeverityTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving incidentseveritytypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("incident-status-types")]
        public async Task<IActionResult> GetIncidentStatusTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var incidentStatusTypes = await staticData.GetIncidentStatusTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = incidentStatusTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving incidentstatustypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("incident-types")]
        public async Task<IActionResult> GetIncidentTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var incidentTypes = await staticData.GetIncidentTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = incidentTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving incidenttypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("injury-types")]
        public async Task<IActionResult> GetInjuryTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var injuryTypes = await staticData.GetInjuryTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = injuryTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving injurytypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("language-types")]
        public async Task<IActionResult> GetLanguageTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var languageTypes = await staticData.GetLanguageTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = languageTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving languagetypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("locations")]
        public async Task<IActionResult> GetLocations()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var locations = await staticData.GetLocationsAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = locations });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving locations");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("policy-types")]
        public async Task<IActionResult> GetPolicyTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var policyTypes = await staticData.GetPolicyTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = policyTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving policytypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("questionnaire-static-data-types")]
        public async Task<IActionResult> GetQuestionnaireStaticDataTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var questionnaireStaticDataTypes = await staticData.GetQuestionnaireStaticDataTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = questionnaireStaticDataTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving questionnairestaticdatatypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("roles")]
        public async Task<IActionResult> GetRoles()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var roles = await staticData.GetRolesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = roles });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving roles");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("severity-types")]
        public async Task<IActionResult> GetSeverityTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var severityTypes = await staticData.GetSeverityTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = severityTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving severitytypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("system-permissions")]
        public async Task<IActionResult> GetSystemPermissions()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var systemPermissions = await staticData.GetSystemPermissionsAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = systemPermissions });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving systempermissions");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("task-status-types")]
        public async Task<IActionResult> GetTaskStatusTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var taskStatusTypes = await staticData.GetTaskStatusTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = taskStatusTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving taskstatustypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("task-types")]
        public async Task<IActionResult> GetTaskTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var taskTypes = await staticData.GetTaskTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = taskTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving tasktypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("theme-types")]
        public async Task<IActionResult> GetThemeTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var themeTypes = await staticData.GetThemeTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = themeTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving themetypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var users = await staticData.GetUsersAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = users });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving users");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("user-areas")]
        public async Task<IActionResult> GetUserAreas()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var userAreas = await staticData.GetUserAreasAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = userAreas });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving userareas");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("work-process-types")]
        public async Task<IActionResult> GetWorkProcessTypes()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var workProcessTypes = await staticData.GetWorkProcessTypesAsync(UserSession.MasterUserAreaID);
                return Ok(new { data = workProcessTypes });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving workprocesstypes");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

    }
}
