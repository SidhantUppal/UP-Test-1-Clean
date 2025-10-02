using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentTemplateTag", Schema = "V7")]
[Index("Category", Name = "IX_DocumentTemplateTag_Category")]
[Index("IsActive", Name = "IX_DocumentTemplateTag_IsActive")]
[Index("TagName", Name = "IX_DocumentTemplateTag_TagName")]
[Index("UserAreaID", Name = "IX_DocumentTemplateTag_UserAreaID")]
[Index("UserAreaID", "TagName", Name = "UQ__Document__2BEEC8D7B5F33A38", IsUnique = true)]
public partial class DocumentTemplateTag
{
    [Key]
    public int DocumentTemplateTagID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(100)]
    public string TagName { get; set; } = null!;

    [StringLength(255)]
    public string DisplayName { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }

    [StringLength(50)]
    public string? Category { get; set; }

    [StringLength(20)]
    public string DataType { get; set; } = null!;

    [StringLength(500)]
    public string? SampleValue { get; set; }

    public bool IsSystemTag { get; set; }

    public bool IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("DocumentTemplateTagArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DocumentTemplateTagCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("DocumentTemplateTagModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("DocumentTemplateTags")]
    public virtual UserArea UserArea { get; set; } = null!;
}
