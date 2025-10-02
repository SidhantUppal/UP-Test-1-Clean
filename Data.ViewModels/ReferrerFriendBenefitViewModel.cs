using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ReferrerFriendBenefitViewModel
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

    // Additional Properties
}
