using Bus.Core;
using Data.EntityFramework;
using Data.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace Bus.StaticData
{
    /// <summary>
    /// Business logic for retrieving static data from the database
    /// </summary>
    public class BSSStaticData : BusBase<V7DBContext>
    {
        #region Constructors

        public BSSStaticData() : base()
        {
        }

        public BSSStaticData(V7DBContext context) : base(context)
        {
        }

        #endregion

        #region Disposal

        protected override void Dispose(bool disposing)
        {
            // Call base class disposal
            base.Dispose(disposing);
        }

        #endregion

        #region Static Data

        public async Task<List<AbsenceApprovalTypeViewModel>> GetAbsenceApprovalTypesAsync(int userAreaId)
        {
            try
            {
                var absenceApprovalTypes = await _dbContext.AbsenceApprovalTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Title)
                    .Select(t => new AbsenceApprovalTypeViewModel
                    {
                        AbsenceApprovalTypeID = t.AbsenceApprovalTypeID,
                        UserAreaID = t.UserAreaID,
                        Reference = t.Reference,
                        Title = t.Title,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return absenceApprovalTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving absenceapprovaltypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<AbsenceDurationTypeViewModel>> GetAbsenceDurationTypesAsync(int userAreaId)
        {
            try
            {
                var absenceDurationTypes = await _dbContext.AbsenceDurationTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Title)
                    .Select(t => new AbsenceDurationTypeViewModel
                    {
                        AbsenceDurationTypeID = t.AbsenceDurationTypeID,
                        UserAreaID = t.UserAreaID,
                        IsConfigurable = t.IsConfigurable,
                        Reference = t.Reference,
                        Title = t.Title,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return absenceDurationTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving absencedurationtypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<AlertTypeViewModel>> GetAlertTypesAsync(int userAreaId)
        {
            try
            {
                var alertTypes = await _dbContext.AlertTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Description)
                    .Select(t => new AlertTypeViewModel
                    {
                        AlertTypeID = t.AlertTypeID,
                        UserAreaID = t.UserAreaID,
                        Reference = t.Reference,
                        IsForActionPlanOnly = t.IsForActionPlanOnly,
                        Title = t.Title,
                        Description = t.Description,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return alertTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving alerttypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<ApiKeyViewModel>> GetApiKeysAsync(int userAreaId)
        {
            try
            {
                var apiKeys = await _dbContext.ApiKeys
                    .Where(t => true)
                    .OrderBy(t => t.ApiKeyID)
                    .Select(t => new ApiKeyViewModel
                    {
                        ApiKeyID = t.ApiKeyID,
                        GUID = t.GUID,
                        UserID = t.UserID,
                        KeyName = t.KeyName,
                        KeyHash = t.KeyHash,
                        KeyPrefix = t.KeyPrefix,
                        Scopes = t.Scopes,
                        IsActive = t.IsActive,
                        ExpiresAt = t.ExpiresAt,
                        LastUsedAt = t.LastUsedAt,
                        UsageCount = t.UsageCount,
                        IPRestrictions = t.IPRestrictions,
                        RateLimitRequests = t.RateLimitRequests,
                        RateLimitWindow = t.RateLimitWindow,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return apiKeys;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving apikeys for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<AssetStatusTypeViewModel>> GetAssetStatusTypesAsync(int userAreaId)
        {
            try
            {
                var assetStatusTypes = await _dbContext.AssetStatusTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Reference)
                    .Select(t => new AssetStatusTypeViewModel
                    {
                        AssetStatusTypeID = t.AssetStatusTypeID,
                        UserAreaID = t.UserAreaID,
                        Reference = t.Reference,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return assetStatusTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving assetstatustypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<BSSTimeZoneViewModel>> GetBSSTimeZonesAsync(int userAreaId)
        {
            try
            {
                var bSSTimeZones = await _dbContext.BSSTimeZones
                    .Where(t => true)
                    .OrderBy(t => t.Name)
                    .Select(t => new BSSTimeZoneViewModel
                    {
                        TimeZoneID = t.TimeZoneID,
                        Code = t.Code,
                        Name = t.Name,
                        UTCOffsetHours = t.UTCOffsetHours,
                        DateFormat = t.DateFormat
                    })
                    .ToListAsync();

                return bSSTimeZones;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving bsstimezones for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<CompetencyViewModel>> GetCompetenciesAsync(int userAreaId)
        {
            try
            {
                var competencies = await _dbContext.Competencies
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Description)
                    .Select(t => new CompetencyViewModel
                    {
                        CompetencyID = t.CompetencyID,
                        Reference = t.Reference,
                        UserAreaID = t.UserAreaID,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate,
                        CategoryID = t.CategoryID,
                        IsGlobal = t.IsGlobal,
                        Title = t.Title,
                        Description = t.Description
                    })
                    .ToListAsync();

                return competencies;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving competencies for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<EmployeeTypeViewModel>> GetEmployeeTypesAsync(int userAreaId)
        {
            try
            {
                var employeeTypes = await _dbContext.EmployeeTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Description)
                    .Select(t => new EmployeeTypeViewModel
                    {
                        EmployeeTypeID = t.EmployeeTypeID,
                        UserAreaID = t.UserAreaID,
                        Reference = t.Reference,
                        Title = t.Title,
                        Description = t.Description,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return employeeTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving employeetypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<FrequencyTypeViewModel>> GetFrequencyTypesAsync(int userAreaId)
        {
            try
            {
                var frequencyTypes = await _dbContext.FrequencyTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Description)
                    .Select(t => new FrequencyTypeViewModel
                    {
                        FrequencyTypeID = t.FrequencyTypeID,
                        UserAreaID = t.UserAreaID,
                        Title = t.Title,
                        Description = t.Description
                    })
                    .ToListAsync();

                return frequencyTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving frequencytypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<HazardCategoryTypeViewModel>> GetHazardCategoryTypesAsync(int userAreaId)
        {
            try
            {
                var hazardCategoryTypes = await _dbContext.HazardCategoryTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Description)
                    .Select(t => new HazardCategoryTypeViewModel
                    {
                        HazardCategoryTypeID = t.HazardCategoryTypeID,
                        ParentCategoryID = t.ParentCategoryID,
                        UserAreaID = t.UserAreaID,
                        Title = t.Title,
                        Description = t.Description,
                        IsActive = t.IsActive,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return hazardCategoryTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving hazardcategorytypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<HazardSeverityTypeViewModel>> GetHazardSeverityTypesAsync(int userAreaId)
        {
            try
            {
                var hazardSeverityTypes = await _dbContext.HazardSeverityTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Description)
                    .Select(t => new HazardSeverityTypeViewModel
                    {
                        HazardSeverityTypeID = t.HazardSeverityTypeID,
                        UserAreaID = t.UserAreaID,
                        Title = t.Title,
                        Reference = t.Reference,
                        Description = t.Description,
                        SeverityLevel = t.SeverityLevel,
                        ColorCode = t.ColorCode,
                        IsActive = t.IsActive,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return hazardSeverityTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving hazardseveritytypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<IncidentCategoryTypeViewModel>> GetIncidentCategoryTypesAsync(int userAreaId)
        {
            try
            {
                var incidentCategoryTypes = await _dbContext.IncidentCategoryTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Description)
                    .Select(t => new IncidentCategoryTypeViewModel
                    {
                        IncidentCategoryTypeID = t.IncidentCategoryTypeID,
                        UserAreaID = t.UserAreaID,
                        Title = t.Title,
                        Reference = t.Reference,
                        Description = t.Description,
                        ColorCode = t.ColorCode,
                        Icon = t.Icon,
                        DisplayOrder = t.DisplayOrder,
                        IsActive = t.IsActive,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return incidentCategoryTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving incidentcategorytypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<IncidentPriorityTypeViewModel>> GetIncidentPriorityTypesAsync(int userAreaId)
        {
            try
            {
                var incidentPriorityTypes = await _dbContext.IncidentPriorityTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Description)
                    .Select(t => new IncidentPriorityTypeViewModel
                    {
                        IncidentPriorityTypeID = t.IncidentPriorityTypeID,
                        UserAreaID = t.UserAreaID,
                        Reference = t.Reference,
                        Title = t.Title,
                        PriorityLevel = t.PriorityLevel,
                        ColorCode = t.ColorCode,
                        Description = t.Description,
                        IsActive = t.IsActive,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return incidentPriorityTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving incidentprioritytypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<IncidentSeverityTypeViewModel>> GetIncidentSeverityTypesAsync(int userAreaId)
        {
            try
            {
                var incidentSeverityTypes = await _dbContext.IncidentSeverityTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Description)
                    .Select(t => new IncidentSeverityTypeViewModel
                    {
                        IncidentSeverityTypeID = t.IncidentSeverityTypeID,
                        UserAreaID = t.UserAreaID,
                        Reference = t.Reference,
                        Title = t.Title,
                        SeverityLevel = t.SeverityLevel,
                        ColorCode = t.ColorCode,
                        Description = t.Description,
                        IsActive = t.IsActive,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return incidentSeverityTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving incidentseveritytypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<IncidentStatusTypeViewModel>> GetIncidentStatusTypesAsync(int userAreaId)
        {
            try
            {
                var incidentStatusTypes = await _dbContext.IncidentStatusTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Description)
                    .Select(t => new IncidentStatusTypeViewModel
                    {
                        IncidentStatusTypeID = t.IncidentStatusTypeID,
                        UserAreaID = t.UserAreaID,
                        Reference = t.Reference,
                        Title = t.Title,
                        StatusOrder = t.StatusOrder,
                        ColorCode = t.ColorCode,
                        Description = t.Description,
                        IsActive = t.IsActive,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return incidentStatusTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving incidentstatustypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<IncidentTypeViewModel>> GetIncidentTypesAsync(int userAreaId)
        {
            try
            {
                var incidentTypes = await _dbContext.IncidentTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Description)
                    .Select(t => new IncidentTypeViewModel
                    {
                        IncidentTypeID = t.IncidentTypeID,
                        UserAreaID = t.UserAreaID,
                        Title = t.Title,
                        Reference = t.Reference,
                        Description = t.Description,
                        FormTemplateID = t.FormTemplateID,
                        IsActive = t.IsActive,
                        DisplayOrder = t.DisplayOrder,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return incidentTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving incidenttypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<InjuryTypeViewModel>> GetInjuryTypesAsync(int userAreaId)
        {
            try
            {
                var injuryTypes = await _dbContext.InjuryTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Description)
                    .Select(t => new InjuryTypeViewModel
                    {
                        InjuryTypeID = t.InjuryTypeID,
                        Reference = t.Reference,
                        IsRIDDORReportable = t.IsRIDDORReportable,
                        Title = t.Title,
                        Description = t.Description,
                        UserAreaID = t.UserAreaID,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate,
                        OrderNum = t.OrderNum,
                        RIDDORValue = t.RIDDORValue
                    })
                    .ToListAsync();

                return injuryTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving injurytypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<LanguageTypeViewModel>> GetLanguageTypesAsync(int userAreaId)
        {
            try
            {
                var languageTypes = await _dbContext.LanguageTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Description)
                    .Select(t => new LanguageTypeViewModel
                    {
                        LanguageTypeID = t.LanguageTypeID,
                        UserAreaID = t.UserAreaID,
                        Title = t.Title,
                        Description = t.Description,
                        Code = t.Code,
                        DefaultRegionTypeID = t.DefaultRegionTypeID
                    })
                    .ToListAsync();

                return languageTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving languagetypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<LocationViewModel>> GetLocationsAsync(int userAreaId)
        {
            try
            {
                var locations = await _dbContext.Locations
                    .Where(t => t.UserAreaID == userAreaId || t.UserAreaID == 0)
                    .OrderBy(t => t.Title)
                    .Select(t => new LocationViewModel
                    {
                        LocationID = t.LocationID,
                        ParentID = t.ParentID,
                        UserAreaID = t.UserAreaID,
                        Reference = t.Reference,
                        Title = t.Title,
                        UPRN = t.UPRN,
                        IsMain = t.IsMain,
                        IsReportTopLevel = t.IsReportTopLevel,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return locations;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving locations for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<PolicyTypeViewModel>> GetPolicyTypesAsync(int userAreaId)
        {
            try
            {
                var policyTypes = await _dbContext.PolicyTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.PolicyTypeID)
                    .Select(t => new PolicyTypeViewModel
                    {
                        PolicyTypeID = t.PolicyTypeID,
                        UserAreaID = t.UserAreaID,
                        TypeName = t.TypeName,
                        TypeDescription = t.TypeDescription,
                        RequiresApproval = t.RequiresApproval,
                        RequiresTraining = t.RequiresTraining,
                        RequiresAcknowledgment = t.RequiresAcknowledgment,
                        ReviewFrequencyMonths = t.ReviewFrequencyMonths,
                        IsActive = t.IsActive,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return policyTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving policytypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<QuestionnaireStaticDataTypeViewModel>> GetQuestionnaireStaticDataTypesAsync(int userAreaId)
        {
            try
            {
                var questionnaireStaticDataTypes = await _dbContext.QuestionnaireStaticDataTypes
                    .Where(t => true)
                    .OrderBy(t => t.Description)
                    .Select(t => new QuestionnaireStaticDataTypeViewModel
                    {
                        QuestionnaireStaticDataTypeID = t.QuestionnaireStaticDataTypeID,
                        Description = t.Description,
                        IsPostBackRequired = t.IsPostBackRequired
                    })
                    .ToListAsync();

                return questionnaireStaticDataTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving questionnairestaticdatatypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<RoleViewModel>> GetRolesAsync(int userAreaId)
        {
            try
            {
                var roles = await _dbContext.Roles
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Description)
                    .Select(t => new RoleViewModel
                    {
                        RoleID = t.RoleID,
                        DefaultModuleTypeID = t.DefaultModuleTypeID,
                        UserAreaID = t.UserAreaID,
                        IsAdministrator = t.IsAdministrator,
                        Description = t.Description,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate,
                        OldID = t.OldID,
                        DefaultURL = t.DefaultURL,
                        DefaultSystemProductTypeID = t.DefaultSystemProductTypeID,
                        UserLimit = t.UserLimit,
                        IsSiteSearchDisabled = t.IsSiteSearchDisabled
                    })
                    .ToListAsync();

                return roles;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving roles for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<SeverityTypeViewModel>> GetSeverityTypesAsync(int userAreaId)
        {
            try
            {
                var severityTypes = await _dbContext.SeverityTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Title)
                    .Select(t => new SeverityTypeViewModel
                    {
                        SeverityTypeID = t.SeverityTypeID,
                        Reference = t.Reference,
                        UserAreaID = t.UserAreaID,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate,
                        TaskSeverityID = t.TaskSeverityID,
                        Title = t.Title
                    })
                    .ToListAsync();

                return severityTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving severitytypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<SystemPermissionViewModel>> GetSystemPermissionsAsync(int userAreaId)
        {
            try
            {
                var systemPermissions = await _dbContext.SystemPermissions
                    .Where(t => true)
                    .OrderBy(t => t.Name)
                    .Select(t => new SystemPermissionViewModel
                    {
                        PermissionID = t.PermissionID,
                        Name = t.Name,
                        DisplayName = t.DisplayName,
                        Layer = t.Layer,
                        Module = t.Module,
                        Description = t.Description
                    })
                    .ToListAsync();

                return systemPermissions;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving systempermissions for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<TaskStatusTypeViewModel>> GetTaskStatusTypesAsync(int userAreaId)
        {
            try
            {
                var taskStatusTypes = await _dbContext.TaskStatusTypes
                    .Where(t => true)
                    .OrderBy(t => t.Title)
                    .Select(t => new TaskStatusTypeViewModel
                    {
                        TaskStatusTypeID = t.TaskStatusTypeID,
                        Reference = t.Reference,
                        Title = t.Title,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return taskStatusTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving taskstatustypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<TaskTypeViewModel>> GetTaskTypesAsync(int userAreaId)
        {
            try
            {
                var taskTypes = await _dbContext.TaskTypes
                    .Where(t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue)
                    .OrderBy(t => t.Title)
                    .Select(t => new TaskTypeViewModel
                    {
                        TaskTypeID = t.TaskTypeID,
                        UserAreaID = t.UserAreaID,
                        Title = t.Title,
                        IsSystemGenerated = t.IsSystemGenerated,
                        IsUserAbleToCreate = t.IsUserAbleToCreate,
                        IsLive = t.IsLive,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return taskTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving tasktypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<ThemeTypeViewModel>> GetThemeTypesAsync(int userAreaId)
        {
            try
            {
                var themeTypes = await _dbContext.ThemeTypes
                    .Where(t => true)
                    .OrderBy(t => t.Description)
                    .Select(t => new ThemeTypeViewModel
                    {
                        ThemeTypeID = t.ThemeTypeID,
                        Title = t.Title,
                        Description = t.Description,
                        CustomCultureRegionString = t.CustomCultureRegionString,
                        CssFolderRelativePath = t.CssFolderRelativePath,
                        ImagesFolderRelativePath = t.ImagesFolderRelativePath,
                        IsLive = t.IsLive
                    })
                    .ToListAsync();

                return themeTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving themetypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<UserViewModel>> GetUsersAsync(int userAreaId)
        {
            try
            {
                var users = await _dbContext.Users
                    .Where(t => t.MasterUserAreaID == userAreaId || !t.MasterUserAreaID.HasValue)
                    .OrderBy(t => t.UserID)
                    .Select(t => new UserViewModel
                    {
                        UserID = t.UserID,
                        GUID = t.GUID,
                        MasterUserAreaID = t.MasterUserAreaID,
                        FullName = t.FullName,
                        Email = t.Email,
                        IsMobileAppUser = t.IsMobileAppUser,
                        HasReadDisclaimer = t.HasReadDisclaimer,
                        IsLocked = t.IsLocked,
                        LockedMessage = t.LockedMessage,
                        LastLoginDate = t.LastLoginDate,
                        AzureADObjectId = t.AzureADObjectId,
                        Username = t.Username,
                        PasswordHash = t.PasswordHash,
                        PasswordSalt = t.PasswordSalt,
                        FailedLoginAttempts = t.FailedLoginAttempts,
                        LastPasswordChange = t.LastPasswordChange,
                        EmailVerified = t.EmailVerified,
                        TwoFactorEnabled = t.TwoFactorEnabled,
                        LastLoginAt = t.LastLoginAt,
                        IPAddress = t.IPAddress,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return users;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving users for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<UserAreaViewModel>> GetUserAreasAsync(int userAreaId)
        {
            try
            {
                var userAreas = await _dbContext.UserAreas
                    .Where(t => t.UserAreaID == userAreaId || t.UserAreaID == 0)
                    .OrderBy(t => t.Description)
                    .Select(t => new UserAreaViewModel
                    {
                        UserAreaID = t.UserAreaID,
                        ThemeTypeID = t.ThemeTypeID,
                        GUID = t.GUID,
                        Title = t.Title,
                        Description = t.Description,
                        Prefix = t.Prefix,
                        IsDemo = t.IsDemo,
                        ExpiryDate = t.ExpiryDate,
                        BaseURL = t.BaseURL,
                        SSOLoginURL = t.SSOLoginURL,
                        MobileIdentityAPIInstanceID = t.MobileIdentityAPIInstanceID,
                        UploadedFileMBLimit = t.UploadedFileMBLimit,
                        CreatedByUserID = t.CreatedByUserID,
                        CreatedDate = t.CreatedDate,
                        ModifiedByUserID = t.ModifiedByUserID,
                        ModifiedDate = t.ModifiedDate,
                        ArchivedByUserID = t.ArchivedByUserID,
                        ArchivedDate = t.ArchivedDate
                    })
                    .ToListAsync();

                return userAreas;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving userareas for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        public async Task<List<WorkProcessTypeViewModel>> GetWorkProcessTypesAsync(int userAreaId)
        {
            try
            {
                var workProcessTypes = await _dbContext.WorkProcessTypes
                    .Where(t => true)
                    .OrderBy(t => t.Description)
                    .Select(t => new WorkProcessTypeViewModel
                    {
                        WorkProcessTypeID = t.WorkProcessTypeID,
                        Reference = t.Reference,
                        Title = t.Title,
                        Description = t.Description
                    })
                    .ToListAsync();

                return workProcessTypes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving workprocesstypes for user area {userAreaId}: {ex.Message}", ex);
            }
        }

        #endregion
    }
}










