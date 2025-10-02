using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserDomainViewModel
{
    [Key]
    public int UserDomainID { get; set; }

    public int UserID { get; set; }

    public int DomainID { get; set; }

    // Additional Properties
}
