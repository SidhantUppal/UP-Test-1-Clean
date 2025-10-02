using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AttachmentBackup", Schema = "V7")]
public partial class AttachmentBackup
{
    [Key]
    public int AttachmentID { get; set; }

    [StringLength(250)]
    public string? AttachmentGuidName { get; set; }

    public int UserAreaID { get; set; }

    public int FolderID { get; set; }

    [StringLength(255)]
    public string FileName { get; set; } = null!;

    public int FileSize { get; set; }

    [StringLength(255)]
    public string ContentType { get; set; } = null!;

    public int AttachmentTypeID { get; set; }

    public int? V5FileID { get; set; }

    public bool IsPublic { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AttachmentBackupArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AttachmentTypeID")]
    [InverseProperty("AttachmentBackups")]
    public virtual AttachmentType AttachmentType { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AttachmentBackupCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("FolderID")]
    [InverseProperty("AttachmentBackups")]
    public virtual Folder Folder { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AttachmentBackupModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("AttachmentBackups")]
    public virtual UserArea UserArea { get; set; } = null!;
}
