using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AsbestosManagementPlanViewModel
{
    [Key]
    public int AsbestosManagementPlanID { get; set; }

    public int UserAreaID { get; set; }

    public int LocationID { get; set; }

    public int? SitePlanAttachmentID { get; set; }

    [StringLength(4000)]
    public string? LocationDetails { get; set; }

    public string? AsbestosRegister { get; set; }

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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
