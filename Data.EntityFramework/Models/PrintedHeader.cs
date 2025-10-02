using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PrintedHeader", Schema = "V7")]
public partial class PrintedHeader
{
    [Key]
    public int PrintedHeaderID { get; set; }

    public int UserAreaID { get; set; }

    public int AttachmentID { get; set; }

    public int? OrgGroupID { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public int? DisplayWidthPX { get; set; }

    public int? DisplayHeightPX { get; set; }

    public int? PDFRowHeightMM { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("PrintedHeaderArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("PrintedHeaders")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("PrintedHeaderCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("PrintedHeaderModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("PrintedHeaders")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("PrintedHeaders")]
    public virtual UserArea UserArea { get; set; } = null!;
}
