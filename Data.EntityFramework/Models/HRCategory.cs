using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCategory", Schema = "V7")]
public partial class HRCategory
{
    [Key]
    public int HRCategoryID { get; set; }

    public int? HRTypeID { get; set; }

    public short? EventType { get; set; }

    public int OrderNum { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public int? UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HRCategoryArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HRCategoryCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("HRCategory")]
    public virtual ICollection<HRCaseEmail> HRCaseEmails { get; set; } = new List<HRCaseEmail>();

    [InverseProperty("HRCategory")]
    public virtual ICollection<HRCaseEvent> HRCaseEvents { get; set; } = new List<HRCaseEvent>();

    [InverseProperty("HRCategory")]
    public virtual ICollection<HRCaseNote> HRCaseNotes { get; set; } = new List<HRCaseNote>();

    [InverseProperty("HRCategory")]
    public virtual ICollection<HRCase> HRCases { get; set; } = new List<HRCase>();

    [InverseProperty("HRCategory")]
    public virtual ICollection<HRTemplateCategory> HRTemplateCategories { get; set; } = new List<HRTemplateCategory>();

    [ForeignKey("HRTypeID")]
    [InverseProperty("HRCategories")]
    public virtual HRType? HRType { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HRCategoryModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("HRCategories")]
    public virtual UserArea? UserArea { get; set; }
}
