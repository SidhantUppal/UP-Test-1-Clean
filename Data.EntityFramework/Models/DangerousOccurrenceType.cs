using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DangerousOccurrenceType", Schema = "V7")]
public partial class DangerousOccurrenceType
{
    [Key]
    public int DangerousOccurrenceTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int DangerousOccurrenceCategoryTypeID { get; set; }

    [StringLength(20)]
    public string? Reference { get; set; }

    [StringLength(20)]
    public string? V5Reference { get; set; }

    public bool IsHidden { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("DangerousOccurrenceTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DangerousOccurrenceTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("DangerousOccurrenceCategoryTypeID")]
    [InverseProperty("DangerousOccurrenceTypes")]
    public virtual DangerousOccurrenceCategoryType DangerousOccurrenceCategoryType { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("DangerousOccurrenceTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("DangerousOccurrenceTypes")]
    public virtual UserArea? UserArea { get; set; }
}
