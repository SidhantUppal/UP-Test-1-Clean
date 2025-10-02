using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ProcessedDocument", Schema = "V7")]
public partial class ProcessedDocument
{
    [Key]
    public int ProcessedDocumentID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(1024)]
    public string? Title { get; set; }

    public string? PlainText { get; set; }

    public int? DocumentAttachmentID { get; set; }

    [StringLength(2048)]
    public string? DocumentURL { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ProcessedDocumentArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ProcessedDocumentCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("DocumentAttachmentID")]
    [InverseProperty("ProcessedDocuments")]
    public virtual Attachment? DocumentAttachment { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ProcessedDocumentModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("ProcessedDocuments")]
    public virtual UserArea UserArea { get; set; } = null!;
}
