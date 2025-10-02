using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DefaultDashboardSlot", Schema = "Report")]
public partial class DefaultDashboardSlot
{
    [Key]
    public int DefaultDashboardSlotID { get; set; }

    public int DefaultDashboardID { get; set; }

    public int SlotID { get; set; }

    public byte? SlotWidth { get; set; }

    public int ModuleTypeID { get; set; }

    public int? ShortcutSystemID { get; set; }

    public int? ShortcutUserFavouriteID { get; set; }

    [ForeignKey("DefaultDashboardID")]
    [InverseProperty("DefaultDashboardSlots")]
    public virtual DefaultDashboard DefaultDashboard { get; set; } = null!;

    [ForeignKey("ModuleTypeID")]
    [InverseProperty("DefaultDashboardSlots")]
    public virtual ModuleType ModuleType { get; set; } = null!;

    [ForeignKey("ShortcutSystemID")]
    [InverseProperty("DefaultDashboardSlots")]
    public virtual ShortcutSystem? ShortcutSystem { get; set; }

    [ForeignKey("ShortcutUserFavouriteID")]
    [InverseProperty("DefaultDashboardSlots")]
    public virtual ShortcutUserFavourite? ShortcutUserFavourite { get; set; }
}
