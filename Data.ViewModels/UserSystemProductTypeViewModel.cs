using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserSystemProductTypeViewModel
{
    [Key]
    public int UserSystemProductTypeID { get; set; }

    public int UserID { get; set; }

    public int UserAreaID { get; set; }

    public int SystemProductTypeID { get; set; }

    public bool IsEnabled { get; set; }

    // Additional Properties
}
