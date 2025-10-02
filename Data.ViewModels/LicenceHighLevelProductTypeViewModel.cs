using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class LicenceHighLevelProductTypeViewModel
{
    [Key]
    public int LicenceProductTypeID { get; set; }

    public int LicenceID { get; set; }

    public int HighLevelProductTypeID { get; set; }

    // Additional Properties
}
