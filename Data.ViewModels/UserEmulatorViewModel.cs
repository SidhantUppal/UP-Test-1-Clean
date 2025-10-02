using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserEmulatorViewModel
{
    [Key]
    public int UserEmulatorID { get; set; }

    public int UserID { get; set; }

    public int? PermittedUserAreaID { get; set; }

    // Additional Properties
}
