using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ShortcutSystem", Schema = "Report")]
public partial class ShortcutSystem
{
    [Key]
    public int ShortcutSystemID { get; set; }

    public int ModuleTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public bool CanAddToDashboard { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    [StringLength(50)]
    public string? Reference { get; set; }

    public string? Filter { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ShortcutSystemArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ShortcutSystemCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("ShortcutSystem")]
    public virtual ICollection<DashboardUserShortcutSlot> DashboardUserShortcutSlots { get; set; } = new List<DashboardUserShortcutSlot>();

    [InverseProperty("ShortcutSystem")]
    public virtual ICollection<DefaultDashboardSlot> DefaultDashboardSlots { get; set; } = new List<DefaultDashboardSlot>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ShortcutSystemModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("ShortcutSystem")]
    public virtual ICollection<ShortcutSystemUser> ShortcutSystemUsers { get; set; } = new List<ShortcutSystemUser>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("ShortcutSystems")]
    public virtual UserArea? UserArea { get; set; }
}
