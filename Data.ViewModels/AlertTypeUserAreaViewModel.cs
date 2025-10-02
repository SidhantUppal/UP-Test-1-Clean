using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AlertTypeUserAreaViewModel
{
    [Key]
    public int AlertTypeUserAreaID { get; set; }

    public int AlertTypeID { get; set; }

    public int UserAreaID { get; set; }

    // Additional Properties
}
