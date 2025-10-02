using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SourceStaticData", Schema = "V7")]
public partial class SourceStaticDatum
{
    [Key]
    public int SourceStaticDataID { get; set; }

    [StringLength(512)]
    [Unicode(false)]
    public string? Title { get; set; }

    public int SourceStaticDataTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(256)]
    public string? IconFileName { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("SourceStaticDatumArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("SourceStaticDatumCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("SourceStaticDatumModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("SourceStaticDataTypeID")]
    [InverseProperty("SourceStaticData")]
    public virtual SourceStaticDataType SourceStaticDataType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("SourceStaticData")]
    public virtual UserArea? UserArea { get; set; }
}
