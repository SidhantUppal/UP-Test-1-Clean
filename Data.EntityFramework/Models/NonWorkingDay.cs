using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("NonWorkingDay", Schema = "V7")]
public partial class NonWorkingDay
{
    [Key]
    public int NonWorkingDayID { get; set; }

    public int UserAreaID { get; set; }

    public int? OrgGroupID { get; set; }

    public int NonWorkingType { get; set; }

    public DateOnly Date { get; set; }

    [StringLength(256)]
    public string? Reason { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("NonWorkingDayArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("NonWorkingDayCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("NonWorkingDayModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("NonWorkingDays")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("NonWorkingDays")]
    public virtual UserArea UserArea { get; set; } = null!;
}
