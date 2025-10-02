using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmployeeSicknessStatusType", Schema = "V7")]
public partial class EmployeeSicknessStatusType
{
    [Key]
    public int EmployeeSicknessStatusTypeID { get; set; }

    public int EmployeeID { get; set; }

    public int SicknessStatusTypeID { get; set; }

    [StringLength(255)]
    public string? Note { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset? DateSentHome { get; set; }

    public DateTimeOffset? ExpectedReturnDate { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int UserAreaID { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EmployeeSicknessStatusTypes")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("EmployeeSicknessStatusTypes")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("SicknessStatusTypeID")]
    [InverseProperty("EmployeeSicknessStatusTypes")]
    public virtual SicknessStatusType SicknessStatusType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("EmployeeSicknessStatusTypes")]
    public virtual UserArea UserArea { get; set; } = null!;
}
