using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SafeSystemOfWorkLinkViewModel
{
    [Key]
    public int SafeSystemOfWorkLinkID { get; set; }

    public int SafeSystemOfWorkID { get; set; }

    public int? DocumentLinkTableTypeID { get; set; }

    public int? RecordID { get; set; }

    public bool? YesNoNAValue { get; set; }

    public DateTimeOffset? CompletedDate { get; set; }

    public string? Comments { get; set; }

    // Additional Properties
}
