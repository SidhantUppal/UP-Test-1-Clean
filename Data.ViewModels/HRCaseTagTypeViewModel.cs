using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCaseTagTypeViewModel
{
    [Key]
    public int HRCaseTagTypeID { get; set; }

    public int HRCaseID { get; set; }

    public int TagTypeID { get; set; }

    // Additional Properties
}
