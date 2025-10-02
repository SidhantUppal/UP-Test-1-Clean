using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PersonsAtRisk", Schema = "V7")]
public partial class PersonsAtRisk
{
    [Key]
    public int PersonsAtRiskID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(100)]
    public string CategoryName { get; set; } = null!;

    [StringLength(500)]
    public string? CategoryDescription { get; set; }

    [StringLength(50)]
    public string? VulnerabilityLevel { get; set; }

    public string? SpecialConsiderations { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("PersonsAtRisk")]
    public virtual ICollection<RiskAssessmentPersonsAtRisk> RiskAssessmentPersonsAtRisks { get; set; } = new List<RiskAssessmentPersonsAtRisk>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("PersonsAtRisks")]
    public virtual UserArea UserArea { get; set; } = null!;
}
