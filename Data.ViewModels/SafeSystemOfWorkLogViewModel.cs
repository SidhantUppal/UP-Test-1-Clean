using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SafeSystemOfWorkLogViewModel
{
    [Key]
    public int SafeSystemOfWorkLogID { get; set; }

    public int UserAreaID { get; set; }

    public int SafeSystemOfWorkID { get; set; }

    public int SafeSystemOfWorkLogTypeID { get; set; }

    [StringLength(255)]
    public string? Comments { get; set; }

    public DateTimeOffset LoggedDate { get; set; }

    public int LoggedByUserID { get; set; }

    [StringLength(100)]
    public string? LoggedByFullName { get; set; }

    [StringLength(100)]
    public string? LoggedByJobTitle { get; set; }

    public string? LoggedBySignature { get; set; }

    // Additional Properties
}
