using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PolicyUserAssignment", Schema = "V7")]
[Index("AssignedToUserID", Name = "IX_PolicyUserAssignment_AssignedToUserID")]
[Index("DueDate", Name = "IX_PolicyUserAssignment_DueDate")]
public partial class PolicyUserAssignment
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

    [ForeignKey("AssignedByUserID")]
    [InverseProperty("PolicyUserAssignmentAssignedByUsers")]
    public virtual User AssignedByUser { get; set; } = null!;

    [ForeignKey("AssignedToUserID")]
    [InverseProperty("PolicyUserAssignmentAssignedToUsers")]
    public virtual User AssignedToUser { get; set; } = null!;

    [ForeignKey("PolicyID")]
    [InverseProperty("PolicyUserAssignments")]
    public virtual Policy Policy { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("PolicyUserAssignments")]
    public virtual UserArea UserArea { get; set; } = null!;
}
