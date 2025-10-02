using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AttachmentLocationViewModel
{
    [Key]
    public int AttachmentLocationID { get; set; }

    public int AttachmentID { get; set; }

    public int LocationID { get; set; }

    // Additional Properties
}
