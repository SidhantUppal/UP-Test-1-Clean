using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("BenefitType", Schema = "Referrer")]
public partial class BenefitType
{
    [Key]
    public int BenefitTypeID { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    [InverseProperty("BenefitType")]
    public virtual ICollection<ReferrerFriendBenefit> ReferrerFriendBenefits { get; set; } = new List<ReferrerFriendBenefit>();

    [InverseProperty("BenefitType")]
    public virtual ICollection<ReferrerUserBenefit> ReferrerUserBenefits { get; set; } = new List<ReferrerUserBenefit>();
}
