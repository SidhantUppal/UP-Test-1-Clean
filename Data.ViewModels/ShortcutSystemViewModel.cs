using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ShortcutSystemViewModel
{
    [Key]
    public int ShortcutSystemID { get; set; }

    public int ModuleTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public bool CanAddToDashboard { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    [StringLength(50)]
    public string? Reference { get; set; }

    public string? Filter { get; set; }

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
