using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AccidentFormTypeUserAreaViewModel
{
    [Key]
    public int AccidentFormTypeUserAreaID { get; set; }

    public int AccidentFormTypeID { get; set; }

    public int UserAreaID { get; set; }

    public bool IsEnabledForWeb { get; set; }

    public bool IsEnabledForApp { get; set; }

    // Additional Properties
}
