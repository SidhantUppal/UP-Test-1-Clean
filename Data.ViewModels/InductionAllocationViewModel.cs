using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class InductionAllocationViewModel
{
    [Key]
    public int InductionAllocationID { get; set; }

    public int InductionBundleID { get; set; }

    public int UserAreaID { get; set; }

    public int EmployeeID { get; set; }

    public bool? RenewalEnabled { get; set; }

    public DateTimeOffset SendDate { get; set; }

    public DateTimeOffset DueDate { get; set; }

    public Guid InvitationGUID { get; set; }

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
