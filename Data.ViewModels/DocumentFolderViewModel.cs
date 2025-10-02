using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentFolderViewModel
{
    [Key]
    public int FolderID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(255)]
    public string Name { get; set; } = null!;

    public int? ParentFolderID { get; set; }

    [StringLength(500)]
    public string Path { get; set; } = null!;

    public bool IsSystemFolder { get; set; }

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
