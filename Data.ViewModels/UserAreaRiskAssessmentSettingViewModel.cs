using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaRiskAssessmentSettingViewModel
{
    [Key]
    public int UserAreaRiskAssessmentSettingsID { get; set; }

    public int? DefaultRiskMatrixTypeID { get; set; }

    public int? DefaultComplianceScoreTypeID { get; set; }

    public int UserAreaID { get; set; }

    public bool IsPreAndPostControlRiskLevelUsed { get; set; }

    public bool ExcludeGlobalRAsFromOrgGroupEmployees { get; set; }

    public bool IncludeAllRAForSSOW { get; set; }

    public bool EnableBasicMode { get; set; }

    public bool EnableDynamicRA { get; set; }

    [StringLength(20)]
    public string? RiskMatrixTypeIDs { get; set; }

    public bool AllowHazardsWithoutRiskLevels { get; set; }

    public bool AllowHazardsWithoutControlMeasures { get; set; }

    public bool EnableSingleHazardView { get; set; }

    public int? CreatedByUserID { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public bool DisableNoMonitoringRequired { get; set; }

    public bool DisableNoReviewRequired { get; set; }

    public bool IsPreAndPostControlRiskLevelConfigurable { get; set; }

    public bool EnforceFAsForNonCompliantControlMeasures { get; set; }

    public int? ReviewDefaultFrequencyPeriod { get; set; }

    public int? ReviewDefaultFrequencyTypeID { get; set; }

    public int? MonitorDefaultFrequencyPeriod { get; set; }

    public int? MonitorDefaultFrequencyTypeID { get; set; }

    [StringLength(100)]
    public string? MonitoringScoreOptionValues { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
