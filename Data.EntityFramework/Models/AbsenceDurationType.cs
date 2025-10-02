using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AbsenceDurationType", Schema = "V7")]
public partial class AbsenceDurationType
{
    [Key]
    public int AbsenceDurationTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public bool IsConfigurable { get; set; }

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

    [InverseProperty("AbsenceDurationType")]
    public virtual ICollection<AbsencePeriod> AbsencePeriods { get; set; } = new List<AbsencePeriod>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AbsenceDurationTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AbsenceDurationTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AbsenceDurationTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("AbsenceDurationTypes")]
    public virtual UserArea? UserArea { get; set; }
}
