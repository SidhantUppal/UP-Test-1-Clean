using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ContractorCompanyAttachmentViewModel
{
    [Key]
    public int ContractorCompanyAttachmentID { get; set; }

    public int ContractorCompanyID { get; set; }

    public int AttachmentID { get; set; }

    // Additional Properties
}
