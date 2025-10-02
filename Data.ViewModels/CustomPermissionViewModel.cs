using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CustomPermissionViewModel
{
    [Key]
    public int CustomPermissionID { get; set; }

    public int PermissionID { get; set; }

    public int PermissionCategoryTypeID { get; set; }

    public int? UserID { get; set; }

    public int? RoleID { get; set; }

    public int UserAreaID { get; set; }

    public int? CustomPermissionItemID { get; set; }

    public bool PermissionOverrideValue { get; set; }

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
