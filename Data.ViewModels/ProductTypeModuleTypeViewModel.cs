using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ProductTypeModuleTypeViewModel
{
    [Key]
    public int ProductTypeModuleTypeID { get; set; }

    public int ProductTypeID { get; set; }

    public int ModuleTypeID { get; set; }

    // Additional Properties
}
