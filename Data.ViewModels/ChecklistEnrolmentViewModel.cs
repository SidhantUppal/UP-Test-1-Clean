using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ChecklistEnrolmentViewModel
{
    [Key]
    public int ChecklistEnrolmentID { get; set; }

    public int ChecklistAssignmentID { get; set; }

    public DateTimeOffset? IsLiveDate { get; set; }

    public DateTimeOffset? StartDate { get; set; }

    public DateTimeOffset? CompletionDate { get; set; }

    public bool? Result { get; set; }

    public string? Note { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? UserAreaID { get; set; }

    public bool IsLocked { get; set; }

    public bool IsCompliant { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
