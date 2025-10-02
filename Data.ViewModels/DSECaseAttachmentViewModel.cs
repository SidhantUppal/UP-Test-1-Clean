using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DSECaseAttachmentViewModel
{
    [Key]
    public int DSECaseAttachmentID { get; set; }

    public int DSECaseID { get; set; }

    public int AttachmentID { get; set; }

    // Additional Properties
}
