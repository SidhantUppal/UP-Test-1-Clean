using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AttachmentBackupViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
