using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CaseViewModel
{
    [Key]
    public int CaseID { get; set; }

    public int? ParentID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public int UserAreaID { get; set; }

    public int CaseStatusTypeID { get; set; }

    public int CaseTypeID { get; set; }

    public int TaskSeverityID { get; set; }

    public DateTimeOffset? DueDate { get; set; }

    public DateTimeOffset? ClosedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public byte PercentageComplete { get; set; }

    public bool IsPrivate { get; set; }

    public int? UserAreaDivisionID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
