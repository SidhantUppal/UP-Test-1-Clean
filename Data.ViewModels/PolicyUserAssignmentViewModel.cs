using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class PolicyUserAssignmentViewModel
{
    [Key]
    public int PolicyUserAssignmentID { get; set; }

    public int UserAreaID { get; set; }

    public int PolicyID { get; set; }

    public int AssignedToUserID { get; set; }

    public int AssignedByUserID { get; set; }

    public DateTimeOffset AssignmentDate { get; set; }

    public DateTimeOffset? DueDate { get; set; }

    [StringLength(20)]
    public string? Priority { get; set; }

    [StringLength(500)]
    public string? AssignmentReason { get; set; }

    public string? SpecialInstructions { get; set; }

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
