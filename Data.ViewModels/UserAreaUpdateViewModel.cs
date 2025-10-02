using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaUpdateViewModel
{
    [Key]
    public int UserAreaUpdateID { get; set; }

    public int UserAreaID { get; set; }

    public int UpdateID { get; set; }

    // Additional Properties
}
