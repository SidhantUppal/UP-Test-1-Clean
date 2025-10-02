using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("GeographicalAreaType", Schema = "V7")]
public partial class GeographicalAreaType
{
    [Key]
    public int GeographicalAreaTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int CountryID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("GeographicalAreaTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CountryID")]
    [InverseProperty("GeographicalAreaTypes")]
    public virtual Country Country { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("GeographicalAreaTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("GeographicalAreaType")]
    public virtual ICollection<LocalAuthorityType> LocalAuthorityTypes { get; set; } = new List<LocalAuthorityType>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("GeographicalAreaTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("GeographicalAreaTypes")]
    public virtual UserArea? UserArea { get; set; }
}
