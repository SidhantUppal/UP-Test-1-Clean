using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetAttachmentViewModel
{
    [Key]
    public int AssetAttachmentID { get; set; }

    public int AttachmentID { get; set; }

    public int AssetID { get; set; }

    public int? TextBlockCollectionID { get; set; }

    // Additional Properties
}
