using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetQRCode", Schema = "V7")]
public partial class AssetQRCode
{
    [Key]
    public int AssetQRCodeID { get; set; }

    public int AssetID { get; set; }

    public int UserAreaID { get; set; }

    public byte[] QRCode { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int QRCodeType { get; set; }
}
