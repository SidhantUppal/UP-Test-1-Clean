using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ContactAttachmentViewModel
{
    [Key]
    public int ContactAttachmentID { get; set; }

    public int ContactID { get; set; }

    public int AttachmentID { get; set; }

    public int ContactAttachmentTypeID { get; set; }

    // Additional Properties
}
