using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CounselChamber", Schema = "V7")]
public partial class CounselChamber
{
    [Key]
    public int CounselChamberID { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    [StringLength(100)]
    public string? Address { get; set; }

    [StringLength(100)]
    public string? PhoneNumber { get; set; }

    public int UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("CounselChamberArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("CounselChamber")]
    public virtual ICollection<Counsel> Counsels { get; set; } = new List<Counsel>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CounselChamberCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("CounselChamberModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("CounselChambers")]
    public virtual UserArea UserArea { get; set; } = null!;
}
