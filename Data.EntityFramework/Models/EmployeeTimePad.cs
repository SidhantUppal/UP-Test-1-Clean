using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmployeeTimePad", Schema = "V7")]
public partial class EmployeeTimePad
{
    [Key]
    public int EmployeeTimePadID { get; set; }

    public int EmployeeID { get; set; }

    [StringLength(100)]
    public string Description { get; set; } = null!;

    public DateTimeOffset? DateTimeFrom { get; set; }

    public DateTimeOffset? DateTimeTo { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EmployeeTimePads")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("EmployeeTimePads")]
    public virtual Employee Employee { get; set; } = null!;
}
