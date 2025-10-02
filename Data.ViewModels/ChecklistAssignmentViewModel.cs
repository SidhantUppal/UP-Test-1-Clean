using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ChecklistAssignmentViewModel
{
    [Key]
    public int ChecklistAssignmentID { get; set; }

    public int ChecklistID { get; set; }

    public int? EmployeeID { get; set; }

    public int? OrgGroupID { get; set; }

    public int UserAreaID { get; set; }

    public bool RenewalEnabled { get; set; }

    public DateTimeOffset? LastEnrollmentDate { get; set; }

    public DateTimeOffset? DueDate { get; set; }

    public int? TaskScheduleID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? ManagerEmployeeID { get; set; }

    public int? LocationID { get; set; }

    public int? ContractorCompanyID { get; set; }

    public int? JobRoleID { get; set; }

    [StringLength(100)]
    public string? Reference { get; set; }

    [StringLength(2000)]
    public string? AdditionalEmployeeIDList { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
