using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TribunalCaseDistribution", Schema = "V7")]
public partial class TribunalCaseDistribution
{
    [Key]
    public int TribunalCaseDistributionID { get; set; }

    public int TribunalCaseID { get; set; }

    public int UserAreaID { get; set; }

    public int? UserID { get; set; }

    [StringLength(150)]
    public string RecipientName { get; set; } = null!;

    [StringLength(255)]
    public string? RecipientEmail { get; set; }

    public bool HasBeenPosted { get; set; }

    public bool HasBeenEmailed { get; set; }

    public bool HasConfirmedReceipt { get; set; }

    public DateTimeOffset? PostedDate { get; set; }

    public DateTimeOffset? EmailedDate { get; set; }

    public DateTimeOffset? ReceiptDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TribunalCaseDistributionCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("TribunalCaseID")]
    [InverseProperty("TribunalCaseDistributions")]
    public virtual TribunalCase TribunalCase { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("TribunalCaseDistributionUsers")]
    public virtual User? User { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("TribunalCaseDistributions")]
    public virtual UserArea UserArea { get; set; } = null!;
}
