using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ReferrerUserBenefitViewModel
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

    // Additional Properties
}
