using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ReferrerFriendViewModel
{
    [Key]
    public int ReferrerFriendID { get; set; }

    public int ReferrerUserID { get; set; }

    public int ReferrerStatusTypeID { get; set; }

    [StringLength(150)]
    public string Name { get; set; } = null!;

    [StringLength(150)]
    public string? Email { get; set; }

    [StringLength(15)]
    public string? Phone1 { get; set; }

    [StringLength(15)]
    public string? Phone2 { get; set; }

    public string? Notes { get; set; }

    public bool IsOKToCall { get; set; }

    public bool IsOKToEmail { get; set; }

    public bool WaitForMeToContact { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
