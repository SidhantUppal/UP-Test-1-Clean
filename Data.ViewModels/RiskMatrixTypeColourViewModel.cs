using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskMatrixTypeColourViewModel
{
    [Key]
    public int RiskMatrixTypeColourID { get; set; }

    public int RiskMatrixTypeID { get; set; }

    public int LikelihoodLevel { get; set; }

    public int ConsequenceLevel { get; set; }

    public int RiskLevelColourTypeID { get; set; }

    public int RiskScore { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
