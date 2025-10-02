using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentAssignment", Schema = "V7")]
public partial class DocumentAssignment
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

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("DocumentAssignmentArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AssignedToUserID")]
    [InverseProperty("DocumentAssignmentAssignedToUsers")]
    public virtual User? AssignedToUser { get; set; }

    [InverseProperty("Assignment")]
    public virtual ICollection<AssignmentHistory> AssignmentHistories { get; set; } = new List<AssignmentHistory>();

    [InverseProperty("Assignment")]
    public virtual ICollection<AssignmentSignature> AssignmentSignatures { get; set; } = new List<AssignmentSignature>();

    [ForeignKey("BundleAssignmentID")]
    [InverseProperty("DocumentAssignments")]
    public virtual DocumentBundleAssignment? BundleAssignment { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DocumentAssignmentCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("DocumentID")]
    [InverseProperty("DocumentAssignments")]
    public virtual Document Document { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("DocumentAssignmentModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("DocumentAssignments")]
    public virtual UserArea UserArea { get; set; } = null!;
}
