using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ReferrerFriendBenefit", Schema = "Referrer")]
public partial class ReferrerFriendBenefit
{
    [Key]
    public int ReferrerFriendBenefitID { get; set; }

    public int ReferrerFriendID { get; set; }

    public int BenefitTypeID { get; set; }

    [StringLength(255)]
    public string? Comments { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("BenefitTypeID")]
    [InverseProperty("ReferrerFriendBenefits")]
    public virtual BenefitType BenefitType { get; set; } = null!;

    [ForeignKey("ReferrerFriendID")]
    [InverseProperty("ReferrerFriendBenefits")]
    public virtual ReferrerFriend ReferrerFriend { get; set; } = null!;
}
