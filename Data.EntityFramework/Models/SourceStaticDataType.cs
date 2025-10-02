using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SourceStaticDataType", Schema = "V7")]
public partial class SourceStaticDataType
{
    [Key]
    public int SourceStaticDataTypeID { get; set; }

    [StringLength(64)]
    [Unicode(false)]
    public string? Title { get; set; }

    [StringLength(256)]
    [Unicode(false)]
    public string? IconFileName { get; set; }

    [InverseProperty("SourceStaticDataType")]
    public virtual ICollection<SourceStaticDatum> SourceStaticData { get; set; } = new List<SourceStaticDatum>();
}
