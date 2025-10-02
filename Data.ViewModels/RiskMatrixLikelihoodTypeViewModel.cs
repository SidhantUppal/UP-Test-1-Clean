using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskMatrixLikelihoodTypeViewModel
{
    [Key]
    public int RiskMatrixLikelihoodTypeID { get; set; }

    public int RiskMatrixTypeID { get; set; }

    public int LikelihoodLevel { get; set; }

    [StringLength(100)]
    public string LikelihoodName { get; set; } = null!;

    [StringLength(500)]
    public string? LikelihoodDescription { get; set; }

    public decimal? Probability { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
}
