using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentBundleAssignment", Schema = "V7")]
public partial class DocumentBundleAssignment
{
    [Key]
    public int BundleAssignmentID { get; set; }

    public int UserAreaID { get; set; }

    public int BundleID { get; set; }

    public int? AssignedToUserID { get; set; }

    public int? AssignedToEmployeeID { get; set; }

    public int? AssignedToContractorID { get; set; }

    public int? AssignedToOrgGroupID { get; set; }

    public int? AssignedToLocationID { get; set; }

    [StringLength(50)]
    public string AssignmentType { get; set; } = null!;

    [StringLength(255)]
    public string? RecipientName { get; set; }

    [StringLength(255)]
    public string? RecipientEmail { get; set; }

    [StringLength(50)]
    public string Status { get; set; } = null!;

    public int TotalDocuments { get; set; }

    public int CompletedDocuments { get; set; }

    public int SignedDocuments { get; set; }

    public bool AllowBulkSign { get; set; }

    [StringLength(50)]
    public string? BulkSignStatus { get; set; }

    public DateTimeOffset? DueDate { get; set; }

    public DateTimeOffset? StartedDate { get; set; }

    public DateTimeOffset? CompletedDate { get; set; }

    public DateTimeOffset? ExpiryDate { get; set; }

    public string? Notes { get; set; }

    public string? Metadata { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("DocumentBundleAssignmentArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AssignedToUserID")]
    [InverseProperty("DocumentBundleAssignmentAssignedToUsers")]
    public virtual User? AssignedToUser { get; set; }

    [ForeignKey("BundleID")]
    [InverseProperty("DocumentBundleAssignments")]
    public virtual DocumentBundle Bundle { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DocumentBundleAssignmentCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("BundleAssignment")]
    public virtual ICollection<DocumentAssignment> DocumentAssignments { get; set; } = new List<DocumentAssignment>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("DocumentBundleAssignmentModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("DocumentBundleAssignments")]
    public virtual UserArea UserArea { get; set; } = null!;
}
