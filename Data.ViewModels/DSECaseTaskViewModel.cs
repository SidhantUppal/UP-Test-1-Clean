using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DSECaseTaskViewModel
{
    [Key]
    public int DSECaseTaskID { get; set; }

    public int? DSECaseID { get; set; }

    public int? TaskID { get; set; }

    public int? UserAreaID { get; set; }

    // Additional Properties
}
