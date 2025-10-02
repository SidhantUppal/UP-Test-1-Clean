using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class EventTagTypeViewModel
{
    [Key]
    public int EventTagTypeID { get; set; }

    public int EventID { get; set; }

    public int TagTypeID { get; set; }

    // Additional Properties
}
