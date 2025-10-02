using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentAssignmentViewModel
{
    [Key]
    public int AssignmentID { get; set; }

    public int UserAreaID { get; set; }

    public int DocumentID { get; set; }

    public int? AssignedToUserID { get; set; }

    public int? AssignedToEmployeeID { get; set; }

    public int? AssignedToContractorID { get; set; }

    public int? AssignedToOrgGroupID { get; set; }

    public int? AssignedToLocationID { get; set; }

    public int? AssignedToRoleID { get; set; }

    [StringLength(50)]
    public string AssignmentType { get; set; } = null!;

    public int? BundleAssignmentID { get; set; }

    [StringLength(50)]
    public string Status { get; set; } = null!;

    [StringLength(20)]
    public string Priority { get; set; } = null!;

    public DateTimeOffset? DueDate { get; set; }

    public DateTimeOffset? ViewedDate { get; set; }

    public DateTimeOffset? CompletedDate { get; set; }

    public bool RequiresSignature { get; set; }

    [StringLength(50)]
    public string? SignatureType { get; set; }

    [StringLength(50)]
    public string? SignatureStatus { get; set; }

    public DateTimeOffset? SignedDate { get; set; }

    public bool ReminderEnabled { get; set; }

    public int? ReminderFrequencyDays { get; set; }

    public DateTimeOffset? LastReminderDate { get; set; }

    public int ReminderCount { get; set; }

    public string? Notes { get; set; }

    public string? CompletionNotes { get; set; }

    public string? Metadata { get; set; }

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
