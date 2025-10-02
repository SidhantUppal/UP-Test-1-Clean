using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRTemplate", Schema = "V7")]
public partial class HRTemplate
{
    [Key]
    public int HRTemplateID { get; set; }

    public int HRTypeID { get; set; }

    [StringLength(100)]
    public string DisplayName { get; set; } = null!;

    public int? UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HRTemplateArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HRTemplateCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("HRTemplate")]
    public virtual ICollection<HRTemplateCategory> HRTemplateCategories { get; set; } = new List<HRTemplateCategory>();

    [ForeignKey("HRTypeID")]
    [InverseProperty("HRTemplates")]
    public virtual HRType HRType { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HRTemplateModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("HRTemplates")]
    public virtual UserArea? UserArea { get; set; }
}
