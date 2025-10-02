using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmployeeCaseStatusType", Schema = "V7")]
public partial class EmployeeCaseStatusType
{
    [Key]
    public int EmployeeCaseStatusTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [InverseProperty("EmployeeCaseStatusType")]
    public virtual ICollection<EmployeeCase> EmployeeCases { get; set; } = new List<EmployeeCase>();
}
