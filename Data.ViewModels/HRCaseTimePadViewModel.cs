using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCaseTimePadViewModel
{
    [Key]
    public int HRCaseTimePadID { get; set; }

    public int HRCaseID { get; set; }

    public int UserID { get; set; }

    public int? EmulatingUserID { get; set; }

    public DateTimeOffset StartDateTime { get; set; }

    public DateTimeOffset? EndDateTime { get; set; }

    public int? DurationInMins { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
}
