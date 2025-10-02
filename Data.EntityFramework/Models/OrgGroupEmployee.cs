using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("OrgGroupEmployee", Schema = "V7")]
[Index("OrgGroupID", "EmployeeID", Name = "CK_OrgGroupEmployee_Unique", IsUnique = true)]
[Index("EmployeeID", Name = "IX_OrgGroupEmployee_EmployeeID")]
[Index("OrgGroupID", Name = "IX_OrgGroupEmployee_OrgGroupID")]
public partial class OrgGroupEmployee
{
    [Key]
    public int OrgGroupEmployeeID { get; set; }

    public int OrgGroupID { get; set; }

    public int EmployeeID { get; set; }

    [ForeignKey("EmployeeID")]
    [InverseProperty("OrgGroupEmployees")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("OrgGroupID")]
    [InverseProperty("OrgGroupEmployees")]
    public virtual OrgGroup OrgGroup { get; set; } = null!;
}
