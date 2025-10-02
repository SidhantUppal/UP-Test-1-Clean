using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserUserAreaDivisionViewModel
{
    [Key]
    public int UserUserAreaDivisionID { get; set; }

    public int UserID { get; set; }

    public int UserAreaDivisionID { get; set; }

    // Additional Properties
}
