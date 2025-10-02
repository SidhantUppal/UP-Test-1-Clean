using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentXMLViewModel
{
    [Key]
    public int RiskAssessmentXMLID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int V5ChecklistCacheID { get; set; }

    public int? V5ChecklistTemplateID { get; set; }

    public bool IsLatest { get; set; }

    public decimal Version { get; set; }

    public string XMLResponse { get; set; } = null!;

    // Additional Properties
}
