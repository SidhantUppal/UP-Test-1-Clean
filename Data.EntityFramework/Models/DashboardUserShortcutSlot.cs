using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DashboardUserShortcutSlot", Schema = "Report")]
public partial class DashboardUserShortcutSlot
{
    [Key]
    public int DashboardUserShortcutSlotID { get; set; }

    public int SlotID { get; set; }

    public int UserID { get; set; }

    public int UserAreaID { get; set; }

    public int? ShortcutSystemID { get; set; }

    public int? ShortcutUserFavouriteID { get; set; }

    public byte? SlotWidth { get; set; }

    public int? DefaultDashboardID { get; set; }

    public bool IsForHomepage { get; set; }

    [ForeignKey("DefaultDashboardID")]
    [InverseProperty("DashboardUserShortcutSlots")]
    public virtual DefaultDashboard? DefaultDashboard { get; set; }

    [ForeignKey("ShortcutSystemID")]
    [InverseProperty("DashboardUserShortcutSlots")]
    public virtual ShortcutSystem? ShortcutSystem { get; set; }

    [ForeignKey("ShortcutUserFavouriteID")]
    [InverseProperty("DashboardUserShortcutSlots")]
    public virtual ShortcutUserFavourite? ShortcutUserFavourite { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("DashboardUserShortcutSlots")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("DashboardUserShortcutSlots")]
    public virtual UserArea UserArea { get; set; } = null!;
}
