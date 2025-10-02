using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class EWMGEscalationPeriodViewModel
{
    [Key]
    public int EWMGEscalationPeriodID { get; set; }

    public int TaskTypeID { get; set; }

    public int? TaskSeverityID { get; set; }

    public int? Tier1AlertDaysOverdue { get; set; }

    public int? Tier2AlertDaysOverdue { get; set; }

    public int? Tier3AlertDaysOverdue { get; set; }

    public int? Tier4AlertDaysOverdue { get; set; }

    public int? Tier5AlertDaysOverdue { get; set; }

    public int? Tier6AlertDaysOverdue { get; set; }

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
