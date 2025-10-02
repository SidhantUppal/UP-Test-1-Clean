using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRTypeHRMeetingTypeViewModel
{
    [Key]
    public int HRTypeHRMeetingTypeID { get; set; }

    public int HRTypeID { get; set; }

    public int HRMeetingTypeID { get; set; }

    // Additional Properties
}
