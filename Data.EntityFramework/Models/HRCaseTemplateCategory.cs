using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCaseTemplateCategory", Schema = "V7")]
[Index("HRCaseID", "HRTemplateCategoryID", Name = "IX_HRCaseTemplateCategory_includes")]
public partial class HRCaseTemplateCategory
{
    [Key]
    public int HRCaseTemplateCategoryID { get; set; }

    public int HRCaseID { get; set; }

    public int HRTemplateCategoryID { get; set; }

    public bool IsSkipped { get; set; }

    public DateTimeOffset? CompletedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HRCaseTemplateCategoryArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HRCaseTemplateCategoryCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("HRCaseID")]
    [InverseProperty("HRCaseTemplateCategories")]
    public virtual HRCase HRCase { get; set; } = null!;

    [InverseProperty("HRCaseTemplateCategory")]
    public virtual ICollection<HRCaseAttachment> HRCaseAttachments { get; set; } = new List<HRCaseAttachment>();

    [InverseProperty("HRCaseTemplateCategory")]
    public virtual ICollection<HRCaseNote> HRCaseNotes { get; set; } = new List<HRCaseNote>();

    [ForeignKey("HRTemplateCategoryID")]
    [InverseProperty("HRCaseTemplateCategories")]
    public virtual HRTemplateCategory HRTemplateCategory { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HRCaseTemplateCategoryModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
