using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRTemplateCategory", Schema = "V7")]
[Index("HRTemplateID", "HRCategoryID", Name = "CK_HRTemplateCategory_Unique", IsUnique = true)]
[Index("HRTemplateID", Name = "IX_HRTemplateCategory_HRTemplateID_includes")]
public partial class HRTemplateCategory
{
    [Key]
    public int HRTemplateCategoryID { get; set; }

    public int HRTemplateID { get; set; }

    public int HRCategoryID { get; set; }

    public byte OrderNum { get; set; }

    public bool IsMandatory { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HRTemplateCategories")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("HRTemplateCategory")]
    public virtual ICollection<HRCaseTemplateCategory> HRCaseTemplateCategories { get; set; } = new List<HRCaseTemplateCategory>();

    [ForeignKey("HRCategoryID")]
    [InverseProperty("HRTemplateCategories")]
    public virtual HRCategory HRCategory { get; set; } = null!;

    [ForeignKey("HRTemplateID")]
    [InverseProperty("HRTemplateCategories")]
    public virtual HRTemplate HRTemplate { get; set; } = null!;
}
