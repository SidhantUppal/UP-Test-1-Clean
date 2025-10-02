using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaCredit", Schema = "V7")]
public partial class UserAreaCredit
{
    [Key]
    public int UserAreaCreditID { get; set; }

    public int UserAreaID { get; set; }

    public int CreditType { get; set; }

    public int AvailableCredits { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? RoleID { get; set; }

    public bool IsEnabled { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserAreaCreditArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaCreditCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaCreditModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("RoleID")]
    [InverseProperty("UserAreaCredits")]
    public virtual Role? Role { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaCredits")]
    public virtual UserArea UserArea { get; set; } = null!;

    [InverseProperty("UserAreaCredit")]
    public virtual ICollection<UserAreaCreditLog> UserAreaCreditLogs { get; set; } = new List<UserAreaCreditLog>();
}
