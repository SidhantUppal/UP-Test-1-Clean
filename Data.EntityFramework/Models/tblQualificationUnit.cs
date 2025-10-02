using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("tblQualificationUnit", Schema = "NVQ")]
public partial class tblQualificationUnit
{
    [Key]
    public int Id { get; set; }

    public int QualificationId { get; set; }

    public int UnitId { get; set; }

    public bool? IsMandatory { get; set; }

    [StringLength(100)]
    public string? GroupName { get; set; }

    public int? MinGroupUnits { get; set; }

    [ForeignKey("QualificationId")]
    [InverseProperty("tblQualificationUnits")]
    public virtual tblQualification Qualification { get; set; } = null!;

    [ForeignKey("UnitId")]
    [InverseProperty("tblQualificationUnits")]
    public virtual tblUnit Unit { get; set; } = null!;
}
