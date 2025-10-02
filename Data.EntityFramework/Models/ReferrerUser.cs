using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ReferrerUser", Schema = "Referrer")]
public partial class ReferrerUser
{
    [Key]
    public int ReferrerUserID { get; set; }

    [StringLength(150)]
    public string Name { get; set; } = null!;

    [StringLength(150)]
    public string? Email { get; set; }

    [StringLength(15)]
    public string? Phone1 { get; set; }

    [StringLength(15)]
    public string? Phone2 { get; set; }

    [StringLength(150)]
    public string? CompanyName { get; set; }

    [StringLength(150)]
    public string LoginUsername { get; set; } = null!;

    [StringLength(50)]
    public string LoginPassword { get; set; } = null!;

    [StringLength(10)]
    public string LoginUserSalt { get; set; } = null!;

    [StringLength(100)]
    public string? RDPassword { get; set; }

    [StringLength(100)]
    public string? T100Password { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("ReferrerUser")]
    public virtual ICollection<ReferrerFriend> ReferrerFriends { get; set; } = new List<ReferrerFriend>();

    [InverseProperty("ReferrerUser")]
    public virtual ICollection<ReferrerUserBenefit> ReferrerUserBenefits { get; set; } = new List<ReferrerUserBenefit>();
}
