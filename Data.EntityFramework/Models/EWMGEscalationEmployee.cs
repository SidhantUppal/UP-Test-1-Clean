using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EWMGEscalationEmployee", Schema = "V7")]
[Index("MasterLocationID", "MasterOrgGroupID", Name = "IX_EWMGEscalationEmployee_LocationOrgGroup")]
[Index("MasterLocationID", "MasterOrgGroupID", "TaskAssigneeEmployeeID", Name = "IX_EWMGEscalationEmployee_LocationOrgGroupEmployee")]
[Index("TaskAssigneeEmployeeID", Name = "IX_EWMGEscalationEmployee_TaskAssignee")]
public partial class EWMGEscalationEmployee
{
    [Key]
    public int EWMGEscalationEmployeeID { get; set; }

    public int MasterLocationID { get; set; }

    public int MasterOrgGroupID { get; set; }

    public int TaskAssigneeEmployeeID { get; set; }

    public int? Tier1ManagerEmployeeID { get; set; }

    public int? Tier2ManagerEmployeeID { get; set; }

    public int? Tier3ManagerEmployeeID { get; set; }

    public int? Tier4ManagerEmployeeID { get; set; }

    public int? Tier5ManagerEmployeeID { get; set; }

    public int? Tier6ManagerEmployeeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("EWMGEscalationEmployeeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EWMGEscalationEmployeeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("MasterLocationID")]
    [InverseProperty("EWMGEscalationEmployees")]
    public virtual Location MasterLocation { get; set; } = null!;

    [ForeignKey("MasterOrgGroupID")]
    [InverseProperty("EWMGEscalationEmployees")]
    public virtual OrgGroup MasterOrgGroup { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("EWMGEscalationEmployeeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("TaskAssigneeEmployeeID")]
    [InverseProperty("EWMGEscalationEmployeeTaskAssigneeEmployees")]
    public virtual Employee TaskAssigneeEmployee { get; set; } = null!;

    [ForeignKey("Tier1ManagerEmployeeID")]
    [InverseProperty("EWMGEscalationEmployeeTier1ManagerEmployees")]
    public virtual Employee? Tier1ManagerEmployee { get; set; }

    [ForeignKey("Tier2ManagerEmployeeID")]
    [InverseProperty("EWMGEscalationEmployeeTier2ManagerEmployees")]
    public virtual Employee? Tier2ManagerEmployee { get; set; }

    [ForeignKey("Tier3ManagerEmployeeID")]
    [InverseProperty("EWMGEscalationEmployeeTier3ManagerEmployees")]
    public virtual Employee? Tier3ManagerEmployee { get; set; }

    [ForeignKey("Tier4ManagerEmployeeID")]
    [InverseProperty("EWMGEscalationEmployeeTier4ManagerEmployees")]
    public virtual Employee? Tier4ManagerEmployee { get; set; }

    [ForeignKey("Tier5ManagerEmployeeID")]
    [InverseProperty("EWMGEscalationEmployeeTier5ManagerEmployees")]
    public virtual Employee? Tier5ManagerEmployee { get; set; }

    [ForeignKey("Tier6ManagerEmployeeID")]
    [InverseProperty("EWMGEscalationEmployeeTier6ManagerEmployees")]
    public virtual Employee? Tier6ManagerEmployee { get; set; }
}
