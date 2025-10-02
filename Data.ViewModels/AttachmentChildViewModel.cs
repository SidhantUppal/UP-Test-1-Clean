using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AttachmentChildViewModel
{
    [Key]
    public int AttachmentChildID { get; set; }

    public int FolderID { get; set; }

    [StringLength(255)]
    public string FileName { get; set; } = null!;

    public int FileSize { get; set; }

    public int? ParentAttachmentID { get; set; }

    // Additional Properties
}
