using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Role", Schema = "V7")]
public partial class Role
{
    [Key]
    public int RoleID { get; set; }

    public int? DefaultModuleTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public bool IsAdministrator { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? OldID { get; set; }

    [StringLength(255)]
    public string? DefaultURL { get; set; }

    public int? DefaultSystemProductTypeID { get; set; }

    public int? UserLimit { get; set; }

    public bool IsSiteSearchDisabled { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("RoleArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("RoleCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("Role")]
    public virtual ICollection<CustomPermission> CustomPermissions { get; set; } = new List<CustomPermission>();

    [ForeignKey("DefaultModuleTypeID")]
    [InverseProperty("Roles")]
    public virtual ModuleType? DefaultModuleType { get; set; }

    [ForeignKey("DefaultSystemProductTypeID")]
    [InverseProperty("Roles")]
    public virtual SystemProductType? DefaultSystemProductType { get; set; }

    [InverseProperty("Role")]
    public virtual ICollection<IncidentCaseViewerRole> IncidentCaseViewerRoles { get; set; } = new List<IncidentCaseViewerRole>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("RoleModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("Role")]
    public virtual ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("Roles")]
    public virtual UserArea? UserArea { get; set; }

    [InverseProperty("Role")]
    public virtual ICollection<UserAreaCreditLog> UserAreaCreditLogs { get; set; } = new List<UserAreaCreditLog>();

    [InverseProperty("Role")]
    public virtual ICollection<UserAreaCredit> UserAreaCredits { get; set; } = new List<UserAreaCredit>();

    [InverseProperty("Role")]
    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
