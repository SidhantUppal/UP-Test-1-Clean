using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetAttachment", Schema = "V7")]
public partial class AssetAttachment
{
    [Key]
    public int AssetAttachmentID { get; set; }

    public int AttachmentID { get; set; }

    public int AssetID { get; set; }

    public int? TextBlockCollectionID { get; set; }
}
