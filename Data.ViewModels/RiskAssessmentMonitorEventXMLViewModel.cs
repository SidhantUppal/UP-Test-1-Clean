using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentMonitorEventXMLViewModel
{
    [Key]
    public int RiskAssessmentMonitorEventXMLID { get; set; }

    public int RiskAssessmentMonitorEventID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int V5ChecklistCacheID { get; set; }

    public int? V5ChecklistResponseID { get; set; }

    public bool IsLatest { get; set; }

    public decimal Version { get; set; }

    public string XMLResponse { get; set; } = null!;

    // Additional Properties
}
