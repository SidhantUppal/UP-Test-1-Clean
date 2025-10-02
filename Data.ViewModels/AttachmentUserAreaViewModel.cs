using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AttachmentUserAreaViewModel
{
    [Key]
    public int AttachmentUserAreaID { get; set; }

    public int AttachmentID { get; set; }

    public int UserAreaID { get; set; }

    // Additional Properties
}
