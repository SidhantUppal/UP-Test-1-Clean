using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("tblQualification", Schema = "NVQ")]
public partial class tblQualification
{
    [Key]
    public int QualificationId { get; set; }

    [StringLength(50)]
    public string QualificationCode { get; set; } = null!;

    [StringLength(200)]
    public string QualificationTitle { get; set; } = null!;

    public int? Level { get; set; }

    [StringLength(100)]
    public string? AwardingBody { get; set; }

    public int? TotalCredits { get; set; }

    public int? MinimumCredits { get; set; }

    public int? GLH { get; set; }

    public string? Description { get; set; }

    public bool? IsActive { get; set; }

    public DateTimeOffset? ValidFrom { get; set; }

    public DateTimeOffset? ValidTo { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    [InverseProperty("Qualification")]
    public virtual ICollection<tblQualificationUnit> tblQualificationUnits { get; set; } = new List<tblQualificationUnit>();
}
