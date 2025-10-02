using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserUserAreaViewModel
{
    [Key]
    public int UserUserAreaID { get; set; }

    public int UserID { get; set; }

    public int UserAreaID { get; set; }

    public bool IsDisabled { get; set; }

    // Additional Properties
}
