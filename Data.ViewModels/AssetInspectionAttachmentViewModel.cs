using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetInspectionAttachmentViewModel
{
    [Key]
    public int AssetInspectionAttachmentID { get; set; }

    public int AttachmentID { get; set; }

    public int AssetInspectionID { get; set; }

    // Additional Properties
}
