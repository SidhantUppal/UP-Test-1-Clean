using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RoleViewModel
{
    [Key]
    public int RoleID { get; set; }

    public int? DefaultModuleTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public bool IsAdministrator { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? OldID { get; set; }

    [StringLength(255)]
    public string? DefaultURL { get; set; }

    public int? DefaultSystemProductTypeID { get; set; }

    public int? UserLimit { get; set; }

    public bool IsSiteSearchDisabled { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
