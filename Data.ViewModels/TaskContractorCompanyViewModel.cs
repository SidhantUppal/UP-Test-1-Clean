using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TaskContractorCompanyViewModel
{
    [Key]
    public int TaskContractorCompanyID { get; set; }

    public int TaskID { get; set; }

    public int ContractorCompanyID { get; set; }

    // Additional Properties
}
