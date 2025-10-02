using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaRiskAssessmentSettings", Schema = "V7")]
[Index("UserAreaID", Name = "CK_UserAreaRiskAssessmentSettings_UserArea", IsUnique = true)]
public partial class UserAreaRiskAssessmentSetting
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
    [Unicode(false)]
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

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserAreaRiskAssessmentSettingArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaRiskAssessmentSettingCreatedByUsers")]
    public virtual User? CreatedByUser { get; set; }

    [ForeignKey("DefaultComplianceScoreTypeID")]
    [InverseProperty("UserAreaRiskAssessmentSettings")]
    public virtual ComplianceScoreType? DefaultComplianceScoreType { get; set; }

    [ForeignKey("DefaultRiskMatrixTypeID")]
    [InverseProperty("UserAreaRiskAssessmentSettings")]
    public virtual RiskMatrixType? DefaultRiskMatrixType { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaRiskAssessmentSettingModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("MonitorDefaultFrequencyTypeID")]
    [InverseProperty("UserAreaRiskAssessmentSettingMonitorDefaultFrequencyTypes")]
    public virtual FrequencyType? MonitorDefaultFrequencyType { get; set; }

    [ForeignKey("ReviewDefaultFrequencyTypeID")]
    [InverseProperty("UserAreaRiskAssessmentSettingReviewDefaultFrequencyTypes")]
    public virtual FrequencyType? ReviewDefaultFrequencyType { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaRiskAssessmentSetting")]
    public virtual UserArea UserArea { get; set; } = null!;
}
