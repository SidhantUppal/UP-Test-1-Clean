using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class BCARMLogViewModel
{
    [Key]
    public int BCARMLogID { get; set; }

    public string XmlRequest { get; set; } = null!;

    public DateTimeOffset DateTime { get; set; }

    [StringLength(40)]
    public string? IPAddress { get; set; }

    // Additional Properties
}
