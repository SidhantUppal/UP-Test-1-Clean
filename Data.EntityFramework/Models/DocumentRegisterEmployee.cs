using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentRegisterEmployee", Schema = "V7")]
[Index("DocumentRegisterID", "EmployeeID", Name = "CK_DocumentRegisterEmployee_Unique", IsUnique = true)]
[Index("DocumentRegisterID", "EmployeeID", Name = "IX_DocumentRegisterEmployee_DocumentRegisterIDEmployeeID")]
[Index("DocumentRegisterID", Name = "IX_DocumentRegisterEmployee_DocumentRegisterID_includes")]
public partial class DocumentRegisterEmployee
{
    [Key]
    public int DocumentRegisterEmployeeID { get; set; }

    public int DocumentRegisterID { get; set; }

    public int EmployeeID { get; set; }

    [ForeignKey("DocumentRegisterID")]
    [InverseProperty("DocumentRegisterEmployees")]
    public virtual DocumentRegister DocumentRegister { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("DocumentRegisterEmployees")]
    public virtual Employee Employee { get; set; } = null!;
}
