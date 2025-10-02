using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("MobileProperty", Schema = "V7")]
public partial class MobileProperty
{
    [Key]
    public int MobilePropertyID { get; set; }

    public int? UserAreaID { get; set; }

    public int? UserID { get; set; }

    [StringLength(256)]
    public string Key { get; set; } = null!;

    [StringLength(256)]
    public string Value { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("MobilePropertyArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("MobilePropertyCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("MobilePropertyModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("MobilePropertyUsers")]
    public virtual User? User { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("MobileProperties")]
    public virtual UserArea? UserArea { get; set; }
}
