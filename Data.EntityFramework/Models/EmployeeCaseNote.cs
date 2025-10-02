using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmployeeCaseNote", Schema = "V7")]
[Index("EmployeeCaseID", Name = "IX_EmployeeCaseNote_Note")]
public partial class EmployeeCaseNote
{
    [Key]
    public int EmployeeCaseNoteID { get; set; }

    public int EmployeeCaseID { get; set; }

    public string Note { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EmployeeCaseNotes")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeCaseID")]
    [InverseProperty("EmployeeCaseNotes")]
    public virtual EmployeeCase EmployeeCase { get; set; } = null!;
}
