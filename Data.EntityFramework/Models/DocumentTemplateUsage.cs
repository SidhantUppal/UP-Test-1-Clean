using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentTemplateUsage", Schema = "V7")]
[Index("DocumentTemplateID", Name = "IX_DocumentTemplateUsage_DocumentTemplateID")]
[Index("UsedByUserID", Name = "IX_DocumentTemplateUsage_UsedByUserID")]
[Index("UsedDate", Name = "IX_DocumentTemplateUsage_UsedDate")]
public partial class DocumentTemplateUsage
{
    [Key]
    public int DocumentTemplateUsageID { get; set; }

    public int DocumentTemplateID { get; set; }

    public int? DocumentID { get; set; }

    public int UsedByUserID { get; set; }

    public DateTimeOffset UsedDate { get; set; }

    [StringLength(255)]
    public string? GeneratedDocumentName { get; set; }

    public string? TagValuesUsed { get; set; }

    [ForeignKey("DocumentTemplateID")]
    [InverseProperty("DocumentTemplateUsages")]
    public virtual DocumentTemplate DocumentTemplate { get; set; } = null!;

    [ForeignKey("UsedByUserID")]
    [InverseProperty("DocumentTemplateUsages")]
    public virtual User UsedByUser { get; set; } = null!;
}
