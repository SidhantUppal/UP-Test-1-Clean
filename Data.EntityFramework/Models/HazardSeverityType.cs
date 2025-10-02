using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HazardSeverityType", Schema = "V7")]
[Index("Reference", Name = "UQ__tmp_ms_x__062B9EB88FBD8F48", IsUnique = true)]
public partial class HazardSeverityType
{
    [Key]
    public int HazardSeverityTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string Title { get; set; } = null!;

    [StringLength(20)]
    public string Reference { get; set; } = null!;

    [StringLength(255)]
    public string? Description { get; set; }

    public int SeverityLevel { get; set; }

    [StringLength(50)]
    public string? ColorCode { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HazardSeverityTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HazardSeverityTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("HazardSeverityType")]
    public virtual ICollection<Hazard> Hazards { get; set; } = new List<Hazard>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HazardSeverityTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("HazardSeverityTypes")]
    public virtual UserArea? UserArea { get; set; }
}
