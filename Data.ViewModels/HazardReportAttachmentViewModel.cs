using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HazardReportAttachmentViewModel
{
    [Key]
    public int HazardReportAttachmentID { get; set; }

    public int HazardReportID { get; set; }

    public int AttachmentID { get; set; }

    // Additional Properties
}
