using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class LoginActionViewModel
{
    [Key]
    public int LoginActionID { get; set; }

    public int LoginActionTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    public DateTimeOffset DateTime { get; set; }

    [StringLength(255)]
    public string? Note { get; set; }

    // Additional Properties
}
