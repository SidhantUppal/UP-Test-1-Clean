using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TribunalCaseViewModel
{
    [Key]
    public int TribunalCaseID { get; set; }

    public int TribunalCaseStatusTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int? ManagerEmployeeID { get; set; }

    public int? ClaimantEmployeeID { get; set; }

    [StringLength(255)]
    public string? Claimant { get; set; }

    [StringLength(255)]
    public string? Respondant { get; set; }

    [StringLength(40)]
    public string? Reference { get; set; }

    public DateTimeOffset? SetupDate { get; set; }

    public DateTimeOffset? HearingDate { get; set; }

    public DateTimeOffset? ClosedDate { get; set; }

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
