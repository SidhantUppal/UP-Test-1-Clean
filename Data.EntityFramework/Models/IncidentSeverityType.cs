using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("IncidentSeverityType", Schema = "V7")]
[Index("Reference", Name = "UQ__tmp_ms_x__062B9EB81DB4C76F", IsUnique = true)]
public partial class IncidentSeverityType
{
    [Key]
    public int IncidentSeverityTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(20)]
    public string Reference { get; set; } = null!;

    [StringLength(50)]
    public string Title { get; set; } = null!;

    public int SeverityLevel { get; set; }

    [StringLength(50)]
    public string? ColorCode { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("IncidentSeverityTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("IncidentSeverityTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("IncidentSeverityType")]
    public virtual ICollection<IncidentCase> IncidentCases { get; set; } = new List<IncidentCase>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("IncidentSeverityTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("IncidentSeverityTypes")]
    public virtual UserArea? UserArea { get; set; }
}
