using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ContractorCompetencyAttachmentViewModel
{
    [Key]
    public int ContractorCompetencyAttachmentID { get; set; }

    public int ContractorCompetencyID { get; set; }

    public int AttachmentID { get; set; }

    // Additional Properties
}
