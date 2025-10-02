using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class VideoCaptionViewModel
{
    [Key]
    public int VideoCaptionID { get; set; }

    public int AttachmentID { get; set; }

    public int CaptionAttachmentID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    // Additional Properties
}
