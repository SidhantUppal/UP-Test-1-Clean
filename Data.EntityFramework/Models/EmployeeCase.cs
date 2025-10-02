using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmployeeCase", Schema = "V7")]
public partial class EmployeeCase
{
    [Key]
    public int EmployeeCaseID { get; set; }

    public int UserAreaID { get; set; }

    public int EmployeeID { get; set; }

    public int EmployeeCaseTypeID { get; set; }

    public int EmployeeCaseStatusTypeID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [StringLength(1000)]
    public string? Comments { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("EmployeeCaseArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EmployeeCaseCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("EmployeeCases")]
    public virtual Employee Employee { get; set; } = null!;

    [InverseProperty("EmployeeCase")]
    public virtual ICollection<EmployeeCaseNote> EmployeeCaseNotes { get; set; } = new List<EmployeeCaseNote>();

    [ForeignKey("EmployeeCaseStatusTypeID")]
    [InverseProperty("EmployeeCases")]
    public virtual EmployeeCaseStatusType EmployeeCaseStatusType { get; set; } = null!;

    [ForeignKey("EmployeeCaseTypeID")]
    [InverseProperty("EmployeeCases")]
    public virtual EmployeeCaseType EmployeeCaseType { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("EmployeeCaseModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("EmployeeCases")]
    public virtual UserArea UserArea { get; set; } = null!;
}
