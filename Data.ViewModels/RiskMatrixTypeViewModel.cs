using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskMatrixTypeViewModel
{
    [Key]
    public int RiskMatrixTypeID { get; set; }

    [StringLength(100)]
    public string MatrixName { get; set; } = null!;

    [StringLength(500)]
    public string? MatrixDescription { get; set; }

    public int? LikelihoodLevels { get; set; }

    public int? ConsequenceLevels { get; set; }

    public bool? IsDefault { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
