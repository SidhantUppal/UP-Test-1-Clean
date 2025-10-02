using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ResourceCreditLimit", Schema = "V7")]
public partial class ResourceCreditLimit
{
    [Key]
    public int ResourceCreditLimitID { get; set; }

    public int UserAreaID { get; set; }

    public int DocumentLinkTableTypeID { get; set; }

    public int CreditLimit { get; set; }

    public string? Notes { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ResourceCreditLimitArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ResourceCreditLimitCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("DocumentLinkTableTypeID")]
    [InverseProperty("ResourceCreditLimits")]
    public virtual DocumentLinkTableType DocumentLinkTableType { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ResourceCreditLimitModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("ResourceCreditLimits")]
    public virtual UserArea UserArea { get; set; } = null!;
}
