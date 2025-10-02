using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ChecklistAssignment", Schema = "V7")]
[Index("ChecklistID", "UserAreaID", "ArchivedDate", "DueDate", Name = "IX_ChecklistAssignment_ChecklistID_UserAreaID_ArchivedDate_DueDate")]
[Index("UserAreaID", "ArchivedDate", "DueDate", Name = "IX_ChecklistAssignment_UserAreaID_ArchivedDate_DueDate")]
public partial class ChecklistAssignment
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

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ChecklistAssignmentArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ChecklistID")]
    [InverseProperty("ChecklistAssignments")]
    public virtual Checklist Checklist { get; set; } = null!;

    [InverseProperty("ChecklistAssignment")]
    public virtual ICollection<ChecklistEnrolment> ChecklistEnrolments { get; set; } = new List<ChecklistEnrolment>();

    [ForeignKey("ContractorCompanyID")]
    [InverseProperty("ChecklistAssignments")]
    public virtual ContractorCompany? ContractorCompany { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ChecklistAssignmentCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("ChecklistAssignments")]
    public virtual Employee? Employee { get; set; }

    [ForeignKey("JobRoleID")]
    [InverseProperty("ChecklistAssignments")]
    public virtual JobRole? JobRole { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("ChecklistAssignments")]
    public virtual Location? Location { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ChecklistAssignmentModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("ChecklistAssignments")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("TaskScheduleID")]
    [InverseProperty("ChecklistAssignments")]
    public virtual TaskSchedule? TaskSchedule { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("ChecklistAssignments")]
    public virtual UserArea UserArea { get; set; } = null!;
}
