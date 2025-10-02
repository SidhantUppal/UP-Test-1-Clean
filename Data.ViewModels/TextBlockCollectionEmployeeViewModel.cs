using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TextBlockCollectionEmployeeViewModel
{
    [Key]
    public int TextBlockCollectionEmployeeID { get; set; }

    public int TextBlockCollectionID { get; set; }

    public int EmployeeID { get; set; }

    // Additional Properties
}
