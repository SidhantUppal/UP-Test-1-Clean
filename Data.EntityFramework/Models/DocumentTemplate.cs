using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentTemplate", Schema = "V7")]
[Index("Category", Name = "IX_DocumentTemplate_Category")]
[Index("DocumentType", Name = "IX_DocumentTemplate_DocumentType")]
[Index("IsActive", Name = "IX_DocumentTemplate_IsActive")]
[Index("Title", Name = "IX_DocumentTemplate_Title")]
[Index("UserAreaID", Name = "IX_DocumentTemplate_UserAreaID")]
public partial class DocumentTemplate
{
    [Key]
    public int DocumentTemplateID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public string Content { get; set; } = null!;

    [StringLength(50)]
    public string DocumentType { get; set; } = null!;

    [StringLength(100)]
    public string? Category { get; set; }

    public string? Tags { get; set; }

    public string? PlaceholderTags { get; set; }

    [StringLength(20)]
    public string Version { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsPublic { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("DocumentTemplateArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DocumentTemplateCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("DocumentTemplate")]
    public virtual ICollection<DocumentBundleItem> DocumentBundleItems { get; set; } = new List<DocumentBundleItem>();

    [InverseProperty("DocumentTemplate")]
    public virtual ICollection<DocumentTemplateUsage> DocumentTemplateUsages { get; set; } = new List<DocumentTemplateUsage>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("DocumentTemplateModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("DocumentTemplates")]
    public virtual UserArea UserArea { get; set; } = null!;
}
