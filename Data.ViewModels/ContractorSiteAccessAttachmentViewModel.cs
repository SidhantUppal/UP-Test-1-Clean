using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ContractorSiteAccessAttachmentViewModel
{
    [Key]
    public int ContractorSiteAccessAttachmentID { get; set; }

    public int ContractorSiteAccessID { get; set; }

    public int ContractorCompanyAttachmentID { get; set; }

    public int LinkedByUserID { get; set; }

    public DateTimeOffset LinkedDate { get; set; }

    [StringLength(255)]
    public string? Comments { get; set; }

    // Additional Properties
}
