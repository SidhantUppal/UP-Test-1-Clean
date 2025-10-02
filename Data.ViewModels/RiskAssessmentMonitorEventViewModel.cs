using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentMonitorEventViewModel
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
    public string? ComplianceColour { get; set; }

    public DateTimeOffset MonitoredDate { get; set; }

    public int UserAreaID { get; set; }

    public int? UserAreaDivisionID { get; set; }

    public string? Notes { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public bool UseYesNoNAMode { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
