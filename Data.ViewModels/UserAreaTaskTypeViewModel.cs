using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaTaskTypeViewModel
{
    [Key]
    public int UserAreaTaskTypeID { get; set; }

    public int TaskTypeID { get; set; }

    public int UserAreaID { get; set; }

    // Additional Properties
}
