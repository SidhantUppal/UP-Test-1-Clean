using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AbsencePeriodViewModel
{
    [Key]
    public int AbsencePeriodID { get; set; }

    public int AbsenceID { get; set; }

    public int AbsenceDurationTypeID { get; set; }

    public int AbsenceApprovalTypeID { get; set; }

    public int UserAreaID { get; set; }

    public bool IsAutomated { get; set; }

    public DateOnly AbsenceDate { get; set; }

    public DateTimeOffset? CustomStartTime { get; set; }

    public DateTimeOffset? CustomEndTime { get; set; }

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
