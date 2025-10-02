using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CourseAllocationViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
