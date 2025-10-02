using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ChecklistTemplateAssignment", Schema = "V7")]
public partial class ChecklistTemplateAssignment
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

    [ForeignKey("AssignedUserAreaID")]
    [InverseProperty("ChecklistTemplateAssignmentAssignedUserAreas")]
    public virtual UserArea AssignedUserArea { get; set; } = null!;

    [ForeignKey("ChecklistTemplateID")]
    [InverseProperty("ChecklistTemplateAssignments")]
    public virtual ChecklistTemplate ChecklistTemplate { get; set; } = null!;

    [InverseProperty("ChecklistTemplateAssignment")]
    public virtual ICollection<ChecklistTemplateEnrolment> ChecklistTemplateEnrolments { get; set; } = new List<ChecklistTemplateEnrolment>();

    [ForeignKey("EmployeeID")]
    [InverseProperty("ChecklistTemplateAssignmentEmployees")]
    public virtual Employee? Employee { get; set; }

    [ForeignKey("IssuingUserAreaID")]
    [InverseProperty("ChecklistTemplateAssignmentIssuingUserAreas")]
    public virtual UserArea? IssuingUserArea { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("ChecklistTemplateAssignments")]
    public virtual Location? Location { get; set; }

    [ForeignKey("ManagerEmployeeID")]
    [InverseProperty("ChecklistTemplateAssignmentManagerEmployees")]
    public virtual Employee? ManagerEmployee { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("ChecklistTemplateAssignments")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("TaskScheduleID")]
    [InverseProperty("ChecklistTemplateAssignments")]
    public virtual TaskSchedule? TaskSchedule { get; set; }
}
