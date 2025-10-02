using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DefaultDashboardUser", Schema = "Report")]
public partial class DefaultDashboardUser
{
    [Key]
    public int DefaultDashboardUserID { get; set; }

    public int DefaultDashboardID { get; set; }

    public int UserID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DefaultDashboardUserCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("DefaultDashboardID")]
    [InverseProperty("DefaultDashboardUsers")]
    public virtual DefaultDashboard DefaultDashboard { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("DefaultDashboardUserUsers")]
    public virtual User User { get; set; } = null!;
}
