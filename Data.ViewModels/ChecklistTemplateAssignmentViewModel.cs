using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ChecklistTemplateAssignmentViewModel
{
    [Key]
    public int ChecklistTemplateAssignmentID { get; set; }

    public int ChecklistTemplateID { get; set; }

    public int? IssuingUserAreaID { get; set; }

    public int AssignedUserAreaID { get; set; }

    public int? EmployeeID { get; set; }

    public int? LocationID { get; set; }

    public int? OrgGroupID { get; set; }

    public int? TaskScheduleID { get; set; }

    public int? ManagerEmployeeID { get; set; }

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
