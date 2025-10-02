using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentRegisterEmployeeViewModel
{
    [Key]
    public int DocumentRegisterEmployeeID { get; set; }

    public int DocumentRegisterID { get; set; }

    public int EmployeeID { get; set; }

    // Additional Properties
}
