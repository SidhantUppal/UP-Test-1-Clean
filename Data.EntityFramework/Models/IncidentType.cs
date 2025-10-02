using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("IncidentType", Schema = "V7")]
[Index("Reference", Name = "UQ__tmp_ms_x__062B9EB82A66F84C", IsUnique = true)]
public partial class IncidentType
{
    [Key]
    public int IncidentTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(100)]
    public string Title { get; set; } = null!;

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }

    public int? FormTemplateID { get; set; }

    public bool? IsActive { get; set; }

    public int? DisplayOrder { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("IncidentTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("IncidentTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("IncidentType")]
    public virtual ICollection<IncidentCase> IncidentCases { get; set; } = new List<IncidentCase>();

    [InverseProperty("IncidentType")]
    public virtual ICollection<IncidentFormDatum> IncidentFormData { get; set; } = new List<IncidentFormDatum>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("IncidentTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("IncidentTypes")]
    public virtual UserArea? UserArea { get; set; }
}
