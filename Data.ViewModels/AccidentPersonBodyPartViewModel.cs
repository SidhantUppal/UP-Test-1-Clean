using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AccidentPersonBodyPartViewModel
{
    [Key]
    public int AccidentPersonBodyPartID { get; set; }

    public int AccidentPersonID { get; set; }

    public int BodyPartID { get; set; }

    // Additional Properties
}
