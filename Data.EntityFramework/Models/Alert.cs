using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Alert", Schema = "V7")]
[Index("EmployeeID", Name = "IX_Alert_EmployeeID_includes")]
public partial class Alert
{
    [Key]
    public int AlertID { get; set; }

    public int AlertTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int EmployeeID { get; set; }

    public int? SeverityTypeID { get; set; }

    public string? MoreInfo { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public DateTimeOffset? ReadDate { get; set; }

    public string? Description { get; set; }

    public int? SystemProductTypeID { get; set; }

    [ForeignKey("AlertTypeID")]
    [InverseProperty("Alerts")]
    public virtual AlertType AlertType { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AlertArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AlertCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("Alerts")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AlertModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("SeverityTypeID")]
    [InverseProperty("Alerts")]
    public virtual SeverityType? SeverityType { get; set; }

    [ForeignKey("SystemProductTypeID")]
    [InverseProperty("Alerts")]
    public virtual SystemProductType? SystemProductType { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("Alerts")]
    public virtual UserArea UserArea { get; set; } = null!;
}
