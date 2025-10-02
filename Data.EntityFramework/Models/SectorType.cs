using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SectorType", Schema = "V7")]
public partial class SectorType
{
    [Key]
    public int SectorTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(20)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("SectorTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("SectorType")]
    public virtual ICollection<Checklist> Checklists { get; set; } = new List<Checklist>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("SectorTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("SectorTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("SectorTypes")]
    public virtual UserArea? UserArea { get; set; }

    [InverseProperty("SectorType")]
    public virtual ICollection<UserAreaSector> UserAreaSectors { get; set; } = new List<UserAreaSector>();
}
