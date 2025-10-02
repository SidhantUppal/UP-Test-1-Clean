using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCaseTaskViewModel
{
    [Key]
    public int HRCaseTaskID { get; set; }

    public int TaskID { get; set; }

    public int HRCaseID { get; set; }

    public int? HRCaseStatusTypeID { get; set; }

    public int? HRCaseMeetingID { get; set; }

    public int? HRCaseEventID { get; set; }

    [StringLength(255)]
    public string? RelatedUserIDList { get; set; }

    // Additional Properties
}
