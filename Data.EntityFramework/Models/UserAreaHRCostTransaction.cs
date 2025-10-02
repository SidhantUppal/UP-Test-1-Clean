using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaHRCostTransaction", Schema = "V7")]
public partial class UserAreaHRCostTransaction
{
    [Key]
    public int UserAreaHRCostTransactionID { get; set; }

    public int UserAreaHRCostLogID { get; set; }

    public int UserAreaID { get; set; }

    public DateOnly TransactionDate { get; set; }

    [Column(TypeName = "decimal(8, 2)")]
    public decimal TransactionAmountGBP { get; set; }

    public byte TransactionType { get; set; }

    public int? NewEmployeesAdded { get; set; }

    public int? NewUsersAdded { get; set; }

    [StringLength(255)]
    public string? Note { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserAreaHRCostTransactionArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaHRCostTransactionCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaHRCostTransactionModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaHRCostTransactions")]
    public virtual UserArea UserArea { get; set; } = null!;

    [ForeignKey("UserAreaHRCostLogID")]
    [InverseProperty("UserAreaHRCostTransactions")]
    public virtual UserAreaHRCostLog UserAreaHRCostLog { get; set; } = null!;
}
