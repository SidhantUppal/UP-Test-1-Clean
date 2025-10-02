using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseAssignment", Schema = "V7")]
[Index("AssignedToUserID", Name = "IX_CourseAssignment_AssignedToUserID")]
[Index("DueDate", Name = "IX_CourseAssignment_DueDate")]
[Index("Status", Name = "IX_CourseAssignment_Status")]
public partial class CourseAssignment
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

    [ForeignKey("AssignedByUserID")]
    [InverseProperty("CourseAssignmentAssignedByUsers")]
    public virtual User AssignedByUser { get; set; } = null!;

    [ForeignKey("AssignedToUserID")]
    [InverseProperty("CourseAssignmentAssignedToUsers")]
    public virtual User AssignedToUser { get; set; } = null!;

    [ForeignKey("CourseID")]
    [InverseProperty("CourseAssignments")]
    public virtual Course Course { get; set; } = null!;

    [InverseProperty("CourseAssignment")]
    public virtual ICollection<CourseEnrollment> CourseEnrollments { get; set; } = new List<CourseEnrollment>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("CourseAssignments")]
    public virtual UserArea UserArea { get; set; } = null!;
}
