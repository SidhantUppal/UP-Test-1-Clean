using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class PermissionViewModel
{
    [Key]
    public int PermissionID { get; set; }

    public int? ParentID { get; set; }

    [StringLength(255)]
    public string Description { get; set; } = null!;

    [StringLength(50)]
    public string Key { get; set; } = null!;

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int IsNotArchived { get; set; }

    // Additional Properties
    public string? ArchivedByUserName { get; set; }
}
