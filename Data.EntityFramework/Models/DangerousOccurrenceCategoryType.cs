using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DangerousOccurrenceCategoryType", Schema = "V7")]
public partial class DangerousOccurrenceCategoryType
{
    [Key]
    public int DangerousOccurrenceCategoryTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(10)]
    public string Reference { get; set; } = null!;

    [StringLength(50)]
    public string? Title { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("DangerousOccurrenceCategoryTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DangerousOccurrenceCategoryTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("DangerousOccurrenceCategoryType")]
    public virtual ICollection<DangerousOccurrenceType> DangerousOccurrenceTypes { get; set; } = new List<DangerousOccurrenceType>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("DangerousOccurrenceCategoryTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("DangerousOccurrenceCategoryTypes")]
    public virtual UserArea? UserArea { get; set; }
}
