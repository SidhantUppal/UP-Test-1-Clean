using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ShortcutSystemUserViewModel
{
    [Key]
    public int ShortcutSystemUserID { get; set; }

    public int ShortcutSystemID { get; set; }

    public int UserID { get; set; }

    // Additional Properties
}
