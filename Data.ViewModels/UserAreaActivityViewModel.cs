using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaActivityViewModel
{
    [Key]
    public int UserAreaActivityID { get; set; }

    public int UserAreaID { get; set; }

    public int? MainIndustryTypeID { get; set; }

    public int? MainActivityTypeID { get; set; }

    public int? SubActivityTypeID { get; set; }

    // Additional Properties
}
