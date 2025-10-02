using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ChecklistViewResponseUserViewModel
{
    [Key]
    public int ChecklistViewResponseUserID { get; set; }

    public int ChecklistID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    // Additional Properties
}
