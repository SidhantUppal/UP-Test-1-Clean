using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DefaultDashboardViewModel
{
    [Key]
    public int DefaultDashboardID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(10)]
    public string LayoutType { get; set; } = null!;

    public byte TotalSlots { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

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
