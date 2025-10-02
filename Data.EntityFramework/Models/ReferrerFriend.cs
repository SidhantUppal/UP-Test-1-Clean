using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ReferrerFriend", Schema = "Referrer")]
public partial class ReferrerFriend
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

    [InverseProperty("ReferrerFriend")]
    public virtual ICollection<ReferrerFriendBenefit> ReferrerFriendBenefits { get; set; } = new List<ReferrerFriendBenefit>();

    [ForeignKey("ReferrerStatusTypeID")]
    [InverseProperty("ReferrerFriends")]
    public virtual ReferrerStatusType ReferrerStatusType { get; set; } = null!;

    [ForeignKey("ReferrerUserID")]
    [InverseProperty("ReferrerFriends")]
    public virtual ReferrerUser ReferrerUser { get; set; } = null!;
}
