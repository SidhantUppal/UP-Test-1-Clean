using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CopyUserAreaEmployeeViewModel
{
    [Key]
    public int CopyUserAreaEmployeeID { get; set; }

    public int? CopiedUserAreaID { get; set; }

    public int? NewUserAreaID { get; set; }

    public int? CopiedEmployeeID { get; set; }

    public int? NewEmployeeID { get; set; }

    public int? CopiedUserID { get; set; }

    // Additional Properties
}
