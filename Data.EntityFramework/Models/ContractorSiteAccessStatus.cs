using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContractorSiteAccessStatus", Schema = "V7")]
public partial class ContractorSiteAccessStatus
{
    [Key]
    public int ContractorSiteAccessStatusID { get; set; }

    public int ContractorSiteAccessID { get; set; }

    public int GenericStatusTypeID { get; set; }

    [StringLength(255)]
    public string? Comments { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ContractorSiteAccessStatusArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ContractorSiteAccessID")]
    [InverseProperty("ContractorSiteAccessStatuses")]
    public virtual ContractorSiteAccess ContractorSiteAccess { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ContractorSiteAccessStatusCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("GenericStatusTypeID")]
    [InverseProperty("ContractorSiteAccessStatuses")]
    public virtual GenericStatusType GenericStatusType { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ContractorSiteAccessStatusModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
