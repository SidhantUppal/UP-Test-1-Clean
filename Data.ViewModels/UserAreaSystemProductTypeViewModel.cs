using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaSystemProductTypeViewModel
{
    [Key]
    public int UserAreaSystemProductTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int SystemProductTypeID { get; set; }

    public bool IsEnabled { get; set; }

    // Additional Properties
}
