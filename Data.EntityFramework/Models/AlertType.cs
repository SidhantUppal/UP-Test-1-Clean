using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AlertType", Schema = "V7")]
public partial class AlertType
{
    [Key]
    public int AlertTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    public bool IsForActionPlanOnly { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("AlertType")]
    public virtual ICollection<AlertTypeEmployee> AlertTypeEmployees { get; set; } = new List<AlertTypeEmployee>();

    [InverseProperty("AlertType")]
    public virtual ICollection<Alert> Alerts { get; set; } = new List<Alert>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AlertTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AlertTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AlertTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("AlertType")]
    public virtual ICollection<PlanCollectionItem> PlanCollectionItems { get; set; } = new List<PlanCollectionItem>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("AlertTypes")]
    public virtual UserArea? UserArea { get; set; }
}
