using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaContactViewModel
{
    [Key]
    public int UserAreaContactID { get; set; }

    public int UserAreaID { get; set; }

    public int ContactID { get; set; }

    // Additional Properties
}
