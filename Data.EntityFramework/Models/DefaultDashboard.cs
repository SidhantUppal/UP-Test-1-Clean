using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DefaultDashboard", Schema = "Report")]
public partial class DefaultDashboard
{
    [Key]
    public int DefaultDashboardID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(10)]
    [Unicode(false)]
    public string LayoutType { get; set; } = null!;

    public byte TotalSlots { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("DefaultDashboardArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DefaultDashboardCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("DefaultDashboard")]
    public virtual ICollection<DashboardUserShortcutSlot> DashboardUserShortcutSlots { get; set; } = new List<DashboardUserShortcutSlot>();

    [InverseProperty("DefaultDashboard")]
    public virtual ICollection<DefaultDashboardSlot> DefaultDashboardSlots { get; set; } = new List<DefaultDashboardSlot>();

    [InverseProperty("DefaultDashboard")]
    public virtual ICollection<DefaultDashboardUser> DefaultDashboardUsers { get; set; } = new List<DefaultDashboardUser>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("DefaultDashboardModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("DefaultDashboards")]
    public virtual UserArea UserArea { get; set; } = null!;
}
