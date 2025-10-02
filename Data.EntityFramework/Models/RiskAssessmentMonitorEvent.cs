using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentMonitorEvent", Schema = "V7")]
[Index("OriginalRiskAssessmentID", "ArchivedDate", Name = "IX_RiskAssessment_OriginalVersion")]
[Index("OrgGroupID", Name = "Org_Group_ID")]
public partial class RiskAssessmentMonitorEvent
{
    [Key]
    public int RiskAssessmentMonitorEventID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int OriginalRiskAssessmentID { get; set; }

    public int MonitorEmployeeID { get; set; }

    [StringLength(255)]
    public string? MonitorEmployeeName { get; set; }

    public int? CheckedByEmployeeID { get; set; }

    [StringLength(255)]
    public string? CheckedByEmployeeName { get; set; }

    public int? OrgGroupID { get; set; }

    public int? LocationID { get; set; }

    public int? ComplianceScore { get; set; }

    [StringLength(10)]
    [Unicode(false)]
    public string? ComplianceColour { get; set; }

    public DateTimeOffset MonitoredDate { get; set; }

    public int UserAreaID { get; set; }

    public int? UserAreaDivisionID { get; set; }

    [Unicode(false)]
    public string? Notes { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public bool UseYesNoNAMode { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("RiskAssessmentMonitorEventArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CheckedByEmployeeID")]
    [InverseProperty("RiskAssessmentMonitorEventCheckedByEmployees")]
    public virtual Employee? CheckedByEmployee { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("RiskAssessmentMonitorEventCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("LocationID")]
    [InverseProperty("RiskAssessmentMonitorEvents")]
    public virtual Location? Location { get; set; }

    [InverseProperty("RiskAssessmentMonitorEvent")]
    public virtual ICollection<MobileSubmission> MobileSubmissions { get; set; } = new List<MobileSubmission>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("RiskAssessmentMonitorEventModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("MonitorEmployeeID")]
    [InverseProperty("RiskAssessmentMonitorEventMonitorEmployees")]
    public virtual Employee MonitorEmployee { get; set; } = null!;

    [ForeignKey("OrgGroupID")]
    [InverseProperty("RiskAssessmentMonitorEvents")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("OriginalRiskAssessmentID")]
    [InverseProperty("RiskAssessmentMonitorEventOriginalRiskAssessments")]
    public virtual RiskAssessment OriginalRiskAssessment { get; set; } = null!;

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("RiskAssessmentMonitorEventRiskAssessments")]
    public virtual RiskAssessment RiskAssessment { get; set; } = null!;

    [InverseProperty("RiskAssessmentMonitorEvent")]
    public virtual ICollection<RiskAssessmentMonitorEventScore> RiskAssessmentMonitorEventScores { get; set; } = new List<RiskAssessmentMonitorEventScore>();

    [InverseProperty("RiskAssessmentMonitorEvent")]
    public virtual ICollection<RiskAssessmentMonitorEventXML> RiskAssessmentMonitorEventXMLs { get; set; } = new List<RiskAssessmentMonitorEventXML>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("RiskAssessmentMonitorEvents")]
    public virtual UserArea UserArea { get; set; } = null!;

    [ForeignKey("UserAreaDivisionID")]
    [InverseProperty("RiskAssessmentMonitorEvents")]
    public virtual UserAreaDivision? UserAreaDivision { get; set; }
}
