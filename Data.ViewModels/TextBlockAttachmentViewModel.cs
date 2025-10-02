using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TextBlockAttachmentViewModel
{
    [Key]
    public int TextBlockAttachmentID { get; set; }

    public int AttachmentID { get; set; }

    public int? TextBlockCollectionID { get; set; }

    public int? TextBlockID { get; set; }

    public bool? IsPolicyLevelAttachment { get; set; }

    // Additional Properties
}
