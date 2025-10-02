using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("BCARMUserArea", Schema = "V7")]
public partial class BCARMUserArea
{
    [Key]
    public int BCARMUserAreaID { get; set; }

    public int? UserAreaID { get; set; }

    public int BCARMUserAreaInternalID { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string CompanyName { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string Address { get; set; } = null!;

    [StringLength(15)]
    [Unicode(false)]
    public string Postcode { get; set; } = null!;

    [StringLength(50)]
    [Unicode(false)]
    public string TelephoneNumber { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string BrokerName { get; set; } = null!;

    [StringLength(50)]
    [Unicode(false)]
    public string FusionBranch { get; set; } = null!;

    [StringLength(50)]
    [Unicode(false)]
    public string AccountStatus { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string TransactionType { get; set; } = null!;

    public DateTimeOffset CreatedDate { get; set; }
}
