using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaActivity", Schema = "V7")]
[Index("UserAreaID", Name = "CK_UserAreaActivity_UserArea", IsUnique = true)]
public partial class UserAreaActivity
{
    [Key]
    public int UserAreaActivityID { get; set; }

    public int UserAreaID { get; set; }

    public int? MainIndustryTypeID { get; set; }

    public int? MainActivityTypeID { get; set; }

    public int? SubActivityTypeID { get; set; }

    [ForeignKey("MainActivityTypeID")]
    [InverseProperty("UserAreaActivities")]
    public virtual MainActivityType? MainActivityType { get; set; }

    [ForeignKey("MainIndustryTypeID")]
    [InverseProperty("UserAreaActivities")]
    public virtual MainIndustryType? MainIndustryType { get; set; }

    [ForeignKey("SubActivityTypeID")]
    [InverseProperty("UserAreaActivities")]
    public virtual SubActivityType? SubActivityType { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaActivity")]
    public virtual UserArea UserArea { get; set; } = null!;
}
