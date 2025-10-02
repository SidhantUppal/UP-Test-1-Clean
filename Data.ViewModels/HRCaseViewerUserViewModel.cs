using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCaseViewerUserViewModel
{
    [Key]
    public int HRCaseViewerUserID { get; set; }

    public int HRCaseID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    public int? CreatedByUserID { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
