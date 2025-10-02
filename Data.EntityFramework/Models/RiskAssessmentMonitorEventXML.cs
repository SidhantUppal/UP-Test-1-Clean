using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentMonitorEventXML", Schema = "V7")]
public partial class RiskAssessmentMonitorEventXML
{
    [Key]
    public int RiskAssessmentMonitorEventXMLID { get; set; }

    public int RiskAssessmentMonitorEventID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int V5ChecklistCacheID { get; set; }

    public int? V5ChecklistResponseID { get; set; }

    public bool IsLatest { get; set; }

    [Column(TypeName = "decimal(4, 1)")]
    public decimal Version { get; set; }

    [Column(TypeName = "xml")]
    public string XMLResponse { get; set; } = null!;

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("RiskAssessmentMonitorEventXMLs")]
    public virtual RiskAssessment RiskAssessment { get; set; } = null!;

    [ForeignKey("RiskAssessmentMonitorEventID")]
    [InverseProperty("RiskAssessmentMonitorEventXMLs")]
    public virtual RiskAssessmentMonitorEvent RiskAssessmentMonitorEvent { get; set; } = null!;
}
