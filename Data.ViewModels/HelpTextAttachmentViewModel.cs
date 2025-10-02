using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HelpTextAttachmentViewModel
{
    [Key]
    public int HelpTextAttachmentID { get; set; }

    public int HelpTextID { get; set; }

    public int AttachmentID { get; set; }

    // Additional Properties
}
