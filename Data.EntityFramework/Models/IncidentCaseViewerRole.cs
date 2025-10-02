using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("IncidentCaseViewerRole", Schema = "V7")]
public partial class IncidentCaseViewerRole
{
    [Key]
    public int IncidentCaseViewerRoleID { get; set; }

    public int UserAreaID { get; set; }

    public int RoleID { get; set; }

    [ForeignKey("RoleID")]
    [InverseProperty("IncidentCaseViewerRoles")]
    public virtual Role Role { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("IncidentCaseViewerRoles")]
    public virtual UserArea UserArea { get; set; } = null!;
}
