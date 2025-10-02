using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentExternalLink", Schema = "V7")]
public partial class RiskAssessmentExternalLink
{
    [Key]
    public int RiskAssessmentExternalLinkID { get; set; }

    public int UserAreaID { get; set; }

    public int RiskAssessmentID { get; set; }

    [StringLength(255)]
    public string LinkTitle { get; set; } = null!;

    [StringLength(500)]
    public string LinkURL { get; set; } = null!;

    [StringLength(500)]
    public string? LinkDescription { get; set; }

    [StringLength(50)]
    public string? LinkType { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("RiskAssessmentExternalLinks")]
    public virtual RiskAssessment RiskAssessment { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("RiskAssessmentExternalLinks")]
    public virtual UserArea UserArea { get; set; } = null!;
}
