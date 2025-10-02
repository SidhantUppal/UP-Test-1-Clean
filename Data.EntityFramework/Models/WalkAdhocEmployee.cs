using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("WalkAdhocEmployee", Schema = "V7")]
public partial class WalkAdhocEmployee
{
    [Key]
    public int WalkAdhocEmployeeID { get; set; }

    public int WalkID { get; set; }

    public int EmployeeID { get; set; }

    public DateTimeOffset? HasAccessFrom { get; set; }

    public DateTimeOffset? HasAccessTo { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("WalkAdhocEmployeeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("WalkAdhocEmployeeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("WalkAdhocEmployees")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("WalkAdhocEmployeeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("WalkID")]
    [InverseProperty("WalkAdhocEmployees")]
    public virtual Walk Walk { get; set; } = null!;
}
