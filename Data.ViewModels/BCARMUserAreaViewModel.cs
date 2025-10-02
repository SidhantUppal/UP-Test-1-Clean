using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class BCARMUserAreaViewModel
{
    [Key]
    public int BCARMUserAreaID { get; set; }

    public int? UserAreaID { get; set; }

    public int BCARMUserAreaInternalID { get; set; }

    [StringLength(255)]
    public string CompanyName { get; set; } = null!;

    [StringLength(255)]
    public string Address { get; set; } = null!;

    [StringLength(15)]
    public string Postcode { get; set; } = null!;

    [StringLength(50)]
    public string TelephoneNumber { get; set; } = null!;

    [StringLength(255)]
    public string BrokerName { get; set; } = null!;

    [StringLength(50)]
    public string FusionBranch { get; set; } = null!;

    [StringLength(50)]
    public string AccountStatus { get; set; } = null!;

    [StringLength(255)]
    public string TransactionType { get; set; } = null!;

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
}
