using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseAllocation", Schema = "V7")]
[Index("LocationID", Name = "IX_CourseAllocation_LocationID")]
[Index("OrgGroupID", Name = "IX_CourseAllocation_OrgGroupID")]
public partial class CourseAllocation
{
    [Key]
    public int CourseAllocationID { get; set; }

    public int UserAreaID { get; set; }

    public int CourseID { get; set; }

    public int? OrgGroupID { get; set; }

    public int? LocationID { get; set; }

    public int? JobRoleID { get; set; }

    public DateTimeOffset AllocationDate { get; set; }

    public DateTimeOffset? DueDate { get; set; }

    public bool? IsMandatory { get; set; }

    public bool? AutoEnrol { get; set; }

    public bool? IsRecurring { get; set; }

    [StringLength(50)]
    public string? RecurrencePattern { get; set; }

    public int? RecurrenceMonths { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("CourseID")]
    [InverseProperty("CourseAllocations")]
    public virtual Course Course { get; set; } = null!;

    [ForeignKey("LocationID")]
    [InverseProperty("CourseAllocations")]
    public virtual Location? Location { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("CourseAllocations")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("CourseAllocations")]
    public virtual UserArea UserArea { get; set; } = null!;
}
