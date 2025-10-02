using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AccidentFormCrossPopulationTypeViewModel
{
    [Key]
    public int AccidentFormCrossPopulationTypeID { get; set; }

    public int MainAccidentFormTypeID { get; set; }

    public int LinkingAccidentFormTypeID { get; set; }

    [StringLength(250)]
    public string Description { get; set; } = null!;

    public bool? IsEnabled { get; set; }

    // Additional Properties
}
