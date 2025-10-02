using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaLanguageViewModel
{
    [Key]
    public int UserAreaLanguageID { get; set; }

    public int UserAreaID { get; set; }

    public int LanguageTypeID { get; set; }

    public bool IsDefault { get; set; }

    // Additional Properties
}
