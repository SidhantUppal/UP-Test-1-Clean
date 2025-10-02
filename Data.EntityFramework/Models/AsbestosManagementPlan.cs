using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AsbestosManagementPlan", Schema = "V7")]
public partial class AsbestosManagementPlan
{
    [Key]
    public int AsbestosManagementPlanID { get; set; }

    public int UserAreaID { get; set; }

    public int LocationID { get; set; }

    public int? SitePlanAttachmentID { get; set; }

    [StringLength(4000)]
    public string? LocationDetails { get; set; }

    [Column(TypeName = "xml")]
    public string? AsbestosRegister { get; set; }

    [Column(TypeName = "xml")]
    public string? AsbestosActionPlan { get; set; }

    [StringLength(4000)]
    public string? CommunicationPlan { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public string? SignatureText { get; set; }

    public DateOnly? SignatureDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AsbestosManagementPlanArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AsbestosManagementPlanCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("LocationID")]
    [InverseProperty("AsbestosManagementPlans")]
    public virtual Location Location { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AsbestosManagementPlanModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("SitePlanAttachmentID")]
    [InverseProperty("AsbestosManagementPlans")]
    public virtual Attachment? SitePlanAttachment { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("AsbestosManagementPlans")]
    public virtual UserArea UserArea { get; set; } = null!;
}
