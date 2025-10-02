using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentFormatType", Schema = "V7")]
public partial class RiskAssessmentFormatType
{
    [Key]
    public int RiskAssessmentFormatTypeID { get; set; }

    [StringLength(100)]
    public string FormatName { get; set; } = null!;

    [StringLength(500)]
    public string? FormatDescription { get; set; }

    [StringLength(500)]
    public string? TemplateURL { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("RiskAssessmentFormatType")]
    public virtual ICollection<RiskAssessment> RiskAssessments { get; set; } = new List<RiskAssessment>();
}
