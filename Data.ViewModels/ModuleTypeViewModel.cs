using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ModuleTypeViewModel
{
    [Key]
    public int ModuleTypeID { get; set; }

    [StringLength(50)]
    public string? Controller { get; set; }

    [StringLength(50)]
    public string? Action { get; set; }

    [StringLength(255)]
    public string? MenuIcon { get; set; }

    public bool IsVisibleOnSidebar { get; set; }

    public int? RootPermissionID { get; set; }

    public int? DisplayPermissionID { get; set; }

    public bool? IsMobileViewable { get; set; }

    public int? ArchivedByUserID { get; set; }

    [StringLength(255)]
    public string? MobileIcon { get; set; }

    public bool IsDevelopedOnMobile { get; set; }

    public int IsNotArchived { get; set; }

    public int? DefaultSystemProductTypeID { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? ArchivedByUserName { get; set; }
}
