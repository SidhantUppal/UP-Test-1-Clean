using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCaseOutcomeType", Schema = "V7")]
public partial class HRCaseOutcomeType
{
    [Key]
    public int HRCaseOutcomeTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int? HRTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HRCaseOutcomeTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HRCaseOutcomeTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("HRCaseOutcomeType")]
    public virtual ICollection<HRCase> HRCases { get; set; } = new List<HRCase>();

    [ForeignKey("HRTypeID")]
    [InverseProperty("HRCaseOutcomeTypes")]
    public virtual HRType? HRType { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HRCaseOutcomeTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("HRCaseOutcomeTypes")]
    public virtual UserArea? UserArea { get; set; }
}
