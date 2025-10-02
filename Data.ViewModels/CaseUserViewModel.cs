using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CaseUserViewModel
{
    [Key]
    public int CaseUserID { get; set; }

    public int CaseID { get; set; }

    public int UserID { get; set; }

    public int CaseUserTypeID { get; set; }

    public bool HasRead { get; set; }

    // Additional Properties
}
