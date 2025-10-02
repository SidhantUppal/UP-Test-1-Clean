using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("IncidentCategoryType", Schema = "V7")]
[Index("Reference", Name = "UQ__Incident__062B9EB8A53A2CCD", IsUnique = true)]
public partial class IncidentCategoryType
{
    [Key]
    public int IncidentCategoryTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(100)]
    public string Title { get; set; } = null!;

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }

    [StringLength(50)]
    public string? ColorCode { get; set; }

    [StringLength(50)]
    public string? Icon { get; set; }

    public int? DisplayOrder { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("IncidentCategoryTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("IncidentCategoryTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("IncidentCategoryTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("IncidentCategoryTypes")]
    public virtual UserArea? UserArea { get; set; }
}
