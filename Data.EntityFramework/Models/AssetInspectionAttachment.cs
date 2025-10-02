using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetInspectionAttachment", Schema = "V7")]
public partial class AssetInspectionAttachment
{
    [Key]
    public int AssetInspectionAttachmentID { get; set; }

    public int AttachmentID { get; set; }

    public int AssetInspectionID { get; set; }
}
