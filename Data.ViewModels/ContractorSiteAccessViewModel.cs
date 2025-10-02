using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ContractorSiteAccessViewModel
{
    [Key]
    public int ContractorSiteAccessID { get; set; }

    public int ContractorCompanyID { get; set; }

    public int SiteUserAreaID { get; set; }

    public int? SiteLocationID { get; set; }

    public DateTimeOffset StartDateTime { get; set; }

    public DateTimeOffset EndDateTime { get; set; }

    [StringLength(1000)]
    public string? WorkDetails { get; set; }

    public string? GeneralComments { get; set; }

    public DateTimeOffset? ClosedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public string? EntryInstructions { get; set; }

    [StringLength(100)]
    public string? ContractingManagerName { get; set; }

    public bool IsRaisedByContractor { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
