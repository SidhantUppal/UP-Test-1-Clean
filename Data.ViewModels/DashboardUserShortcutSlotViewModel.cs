using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DashboardUserShortcutSlotViewModel
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

    // Additional Properties
}
