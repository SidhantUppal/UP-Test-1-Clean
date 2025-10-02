using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserRoleViewModel
{
    [Key]
    public int UserRoleID { get; set; }

    public int? UserID { get; set; }

    public int? RoleID { get; set; }

    public int? UserAreaID { get; set; }

    // Additional Properties
}
