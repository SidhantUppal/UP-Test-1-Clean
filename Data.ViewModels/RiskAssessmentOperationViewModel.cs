using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentOperationViewModel
{
    [Key]
    public int RiskAssessmentOperationID { get; set; }

    public int UserAreaID { get; set; }

    public int RiskAssessmentID { get; set; }

    [StringLength(255)]
    public string OperationName { get; set; } = null!;

    public string? OperationDescription { get; set; }

    public int? OperationSequence { get; set; }

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
