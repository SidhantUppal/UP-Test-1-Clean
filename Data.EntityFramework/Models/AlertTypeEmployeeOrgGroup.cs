using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AlertTypeEmployeeOrgGroup", Schema = "V7")]
[Index("AlertTypeEmployeeID", Name = "IX_AlertTypeEmployeeOrgGroup_AlertTypeEmployee")]
public partial class AlertTypeEmployeeOrgGroup
{
    [Key]
    public int AlertTypeEmployeeOrgGroupID { get; set; }

    public int AlertTypeEmployeeID { get; set; }

    public int OrgGroupID { get; set; }

    [ForeignKey("AlertTypeEmployeeID")]
    [InverseProperty("AlertTypeEmployeeOrgGroups")]
    public virtual AlertTypeEmployee AlertTypeEmployee { get; set; } = null!;

    [ForeignKey("OrgGroupID")]
    [InverseProperty("AlertTypeEmployeeOrgGroups")]
    public virtual OrgGroup OrgGroup { get; set; } = null!;
}
