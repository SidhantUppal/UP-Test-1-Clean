using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("MainActivityType", Schema = "V7")]
public partial class MainActivityType
{
    [Key]
    public int MainActivityTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int MainIndustryTypeID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

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
    [InverseProperty("MainActivityTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("MainActivityType")]
    public virtual ICollection<Company> Companies { get; set; } = new List<Company>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("MainActivityTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("MainIndustryTypeID")]
    [InverseProperty("MainActivityTypes")]
    public virtual MainIndustryType MainIndustryType { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("MainActivityTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("MainActivityTypes")]
    public virtual UserArea? UserArea { get; set; }

    [InverseProperty("MainActivityType")]
    public virtual ICollection<UserAreaActivity> UserAreaActivities { get; set; } = new List<UserAreaActivity>();
}
