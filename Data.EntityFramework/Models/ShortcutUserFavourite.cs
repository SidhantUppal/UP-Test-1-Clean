using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ShortcutUserFavourite", Schema = "Report")]
public partial class ShortcutUserFavourite
{
    [Key]
    public int ShortcutUserFavouriteID { get; set; }

    public int UserID { get; set; }

    public int ModuleTypeID { get; set; }

    public int DashboardStatusTypeID { get; set; }

    public string? Filter { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? UserAreaID { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ShortcutUserFavouriteArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ShortcutUserFavouriteCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("ShortcutUserFavourite")]
    public virtual ICollection<DashboardUserShortcutSlot> DashboardUserShortcutSlots { get; set; } = new List<DashboardUserShortcutSlot>();

    [InverseProperty("ShortcutUserFavourite")]
    public virtual ICollection<DefaultDashboardSlot> DefaultDashboardSlots { get; set; } = new List<DefaultDashboardSlot>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ShortcutUserFavouriteModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("ShortcutUserFavouriteUsers")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("ShortcutUserFavourites")]
    public virtual UserArea? UserArea { get; set; }
}
