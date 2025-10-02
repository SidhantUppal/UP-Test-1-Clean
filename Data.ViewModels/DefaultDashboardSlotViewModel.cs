using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DefaultDashboardSlotViewModel
{
    [Key]
    public int DefaultDashboardSlotID { get; set; }

    public int DefaultDashboardID { get; set; }

    public int SlotID { get; set; }

    public byte? SlotWidth { get; set; }

    public int ModuleTypeID { get; set; }

    public int? ShortcutSystemID { get; set; }

    public int? ShortcutUserFavouriteID { get; set; }

    // Additional Properties
}
