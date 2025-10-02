using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CourseAssignmentViewModel
{
    [Key]
    public int CourseAssignmentID { get; set; }

    public int UserAreaID { get; set; }

    public int CourseID { get; set; }

    public int AssignedToUserID { get; set; }

    public int AssignedByUserID { get; set; }

    public DateTimeOffset AssignmentDate { get; set; }

    public DateTimeOffset? DueDate { get; set; }

    [StringLength(20)]
    public string? Priority { get; set; }

    public string? Notes { get; set; }

    [StringLength(50)]
    public string? Status { get; set; }

    public DateTimeOffset? CompletedDate { get; set; }

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
