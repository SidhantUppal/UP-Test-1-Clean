using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PersonsInCharge", Schema = "V7")]
public partial class PersonsInCharge
{
    [Key]
    public int PersonsInChargeID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    [StringLength(100)]
    public string ResponsibilityLevel { get; set; } = null!;

    [StringLength(500)]
    public string? ResponsibilityDescription { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("PersonsInCharges")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("PersonsInCharges")]
    public virtual UserArea UserArea { get; set; } = null!;
}
