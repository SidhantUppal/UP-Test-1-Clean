using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentBundleItem", Schema = "V7")]
[Index("BundleID", Name = "IX_DocumentBundleItem_BundleID")]
[Index("DocumentID", Name = "IX_DocumentBundleItem_DocumentID")]
[Index("DocumentTemplateID", Name = "IX_DocumentBundleItem_DocumentTemplateID")]
public partial class DocumentBundleItem
{
    [Key]
    public int BundleItemID { get; set; }

    public int BundleID { get; set; }

    public int? DocumentID { get; set; }

    public int? DocumentTemplateID { get; set; }

    public int DisplayOrder { get; set; }

    public bool IsRequired { get; set; }

    public bool RequiresSignature { get; set; }

    [StringLength(50)]
    public string? SignatureType { get; set; }

    public string? Instructions { get; set; }

    public int? DueDaysOffset { get; set; }

    public string? Metadata { get; set; }

    [ForeignKey("BundleID")]
    [InverseProperty("DocumentBundleItems")]
    public virtual DocumentBundle Bundle { get; set; } = null!;

    [ForeignKey("DocumentID")]
    [InverseProperty("DocumentBundleItems")]
    public virtual Document? Document { get; set; }

    [ForeignKey("DocumentTemplateID")]
    [InverseProperty("DocumentBundleItems")]
    public virtual DocumentTemplate? DocumentTemplate { get; set; }
}
