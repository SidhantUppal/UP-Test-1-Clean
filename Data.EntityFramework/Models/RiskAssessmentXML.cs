using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentXML", Schema = "V7")]
public partial class RiskAssessmentXML
{
    [Key]
    public int RiskAssessmentXMLID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int V5ChecklistCacheID { get; set; }

    public int? V5ChecklistTemplateID { get; set; }

    public bool IsLatest { get; set; }

    [Column(TypeName = "decimal(4, 1)")]
    public decimal Version { get; set; }

    [Column(TypeName = "xml")]
    public string XMLResponse { get; set; } = null!;

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("RiskAssessmentXMLs")]
    public virtual RiskAssessment RiskAssessment { get; set; } = null!;
}
