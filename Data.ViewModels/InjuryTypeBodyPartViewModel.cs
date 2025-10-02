using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class InjuryTypeBodyPartViewModel
{
    [Key]
    public int InjuryTypeBodyPartID { get; set; }

    public int InjuryTypeID { get; set; }

    public int? BodyPartID { get; set; }

    public bool IsRIDDOrReportable { get; set; }

    // Additional Properties
}
