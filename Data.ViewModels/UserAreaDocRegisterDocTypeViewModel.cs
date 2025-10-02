using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaDocRegisterDocTypeViewModel
{
    [Key]
    public int UserAreaDocRegisterDocTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int DocRegisterDocTypeID { get; set; }

    // Additional Properties
}
