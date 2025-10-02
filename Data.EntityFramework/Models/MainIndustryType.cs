using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("MainIndustryType", Schema = "V7")]
public partial class MainIndustryType
{
    [Key]
    public int MainIndustryTypeID { get; set; }

    public int? UserAreaID { get; set; }

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
    [InverseProperty("MainIndustryTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("MainIndustryType")]
    public virtual ICollection<Company> Companies { get; set; } = new List<Company>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("MainIndustryTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("MainIndustryType")]
    public virtual ICollection<MainActivityType> MainActivityTypes { get; set; } = new List<MainActivityType>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("MainIndustryTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("MainIndustryTypes")]
    public virtual UserArea? UserArea { get; set; }

    [InverseProperty("MainIndustryType")]
    public virtual ICollection<UserAreaActivity> UserAreaActivities { get; set; } = new List<UserAreaActivity>();
}
