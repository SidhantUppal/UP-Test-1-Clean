using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class EventAudienceViewModel
{
    [Key]
    public int EventAudienceID { get; set; }

    public int EventID { get; set; }

    public int? UserAreaID { get; set; }

    public int? UserID { get; set; }

    // Additional Properties
}
