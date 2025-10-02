using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CopyUserAreaData", Schema = "V7")]
public partial class CopyUserAreaDatum
{
    [Key]
    public int CopyUserAreaDataID { get; set; }

    public int? CopiedUserAreaID { get; set; }

    public int? NewUserAreaID { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? TypeName { get; set; }

    public int? CopiedID { get; set; }

    public int? NewID { get; set; }

    public int? CopiedParentID { get; set; }

    public int? NewParentID { get; set; }
}
