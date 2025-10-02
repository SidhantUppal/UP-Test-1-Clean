using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaHRCostTransactionViewModel
{
    [Key]
    public int UserAreaHRCostTransactionID { get; set; }

    public int UserAreaHRCostLogID { get; set; }

    public int UserAreaID { get; set; }

    public DateOnly TransactionDate { get; set; }

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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
