using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCaseAdvisor", Schema = "V7")]
public partial class HRCaseAdvisor
{
    [Key]
    public int HRCaseAdvisorID { get; set; }

    public int? EmployeeID { get; set; }

    public int? HRCaseID { get; set; }

    public int? UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HRCaseAdvisorArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HRCaseAdvisorCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("HRCaseAdvisors")]
    public virtual Employee? Employee { get; set; }

    [ForeignKey("HRCaseID")]
    [InverseProperty("HRCaseAdvisors")]
    public virtual HRCase? HRCase { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HRCaseAdvisorModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("HRCaseAdvisors")]
    public virtual UserArea? UserArea { get; set; }
}
