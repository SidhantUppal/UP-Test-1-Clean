using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CopyUserAreaUserViewModel
{
    [Key]
    public int CopyUserAreaUserID { get; set; }

    public int? CopiedUserAreaID { get; set; }

    public int? NewUserAreaID { get; set; }

    public int? CopiedUserID { get; set; }

    public int? NewUserID { get; set; }

    // Additional Properties
}
