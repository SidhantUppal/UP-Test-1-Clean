using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ReferrerUserBenefit", Schema = "Referrer")]
public partial class ReferrerUserBenefit
{
    [Key]
    public int ReferrerUserBenefitID { get; set; }

    public int ReferrerUserID { get; set; }

    public int BenefitTypeID { get; set; }

    [StringLength(150)]
    public string? CharityDetails { get; set; }

    [StringLength(150)]
    public string? GiftCardDetails { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("BenefitTypeID")]
    [InverseProperty("ReferrerUserBenefits")]
    public virtual BenefitType BenefitType { get; set; } = null!;

    [ForeignKey("ReferrerUserID")]
    [InverseProperty("ReferrerUserBenefits")]
    public virtual ReferrerUser ReferrerUser { get; set; } = null!;
}
