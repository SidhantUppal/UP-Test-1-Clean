using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserPasswordHistoryViewModel
{
    [Key]
    public int UserPasswordHistoryID { get; set; }

    public int UserID { get; set; }

    [StringLength(10)]
    public string Salt { get; set; } = null!;

    [StringLength(50)]
    public string Password { get; set; } = null!;

    public DateTimeOffset? InvalidatedDate { get; set; }

    // Additional Properties
}
