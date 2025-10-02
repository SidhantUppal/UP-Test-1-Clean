using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ContractorSiteAccessRequirementViewModel
{
    [Key]
    public int ContractorSiteAccessRequirementID { get; set; }

    public int ContractorSiteAccessID { get; set; }

    public int RequirementType { get; set; }

    [StringLength(150)]
    public string? RequirementTitle { get; set; }

    public int? ContractorSiteAccessAttachmentID { get; set; }

    public int? TaskID { get; set; }

    public DateTimeOffset? ExemptUntilDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? UserAreaFormResponseID { get; set; }

    public int? ContractorSiteAccessPersonnelID { get; set; }

    public bool IsComplete { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
