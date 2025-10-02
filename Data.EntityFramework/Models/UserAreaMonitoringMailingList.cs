using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaMonitoringMailingList", Schema = "V7")]
public partial class UserAreaMonitoringMailingList
{
    [Key]
    public int UserAreaMonitoringMailingListID { get; set; }

    public int? V5MailingListID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(250)]
    public string? Name { get; set; }

    [StringLength(250)]
    public string? Email { get; set; }

    public int? EmployeeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserAreaMonitoringMailingListArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaMonitoringMailingListCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("UserAreaMonitoringMailingLists")]
    public virtual Employee? Employee { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaMonitoringMailingListModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaMonitoringMailingLists")]
    public virtual UserArea UserArea { get; set; } = null!;
}
