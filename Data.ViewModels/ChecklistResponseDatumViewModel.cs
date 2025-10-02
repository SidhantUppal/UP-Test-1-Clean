using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ChecklistResponseDatumViewModel
{
    [Key]
    public int ChecklistResponseDataID { get; set; }

    public int UserAreaFormResponseID { get; set; }

    public string ResponseJSON { get; set; } = null!;

    public int? TotalScore { get; set; }

    public int? MaxPossibleScore { get; set; }

    public decimal? CompletionPercent { get; set; }

    public bool? FailedCritical { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
}
