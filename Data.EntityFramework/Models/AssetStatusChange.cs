using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetStatusChange", Schema = "V7")]
public partial class AssetStatusChange
{
    [Key]
    public int AssetStatusChangeID { get; set; }

    public int AssetID { get; set; }

    public int AssetStatusChangeTypeID { get; set; }

    [Column(TypeName = "numeric(10, 2)")]
    public decimal ChangeCost { get; set; }

    public DateTimeOffset ChangeDate { get; set; }

    public string? ChangeComments { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }
}
