using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ContractorCompanyLogViewModel
{
    [Key]
    public int ContractorCompanyLogID { get; set; }

    public int UserAreaID { get; set; }

    public int ContractorCompanyID { get; set; }

    [StringLength(255)]
    public string? Comments { get; set; }

    public DateOnly LoggedDate { get; set; }

    public int LoggedByUserID { get; set; }

    [StringLength(100)]
    public string? LoggedByFullName { get; set; }

    [StringLength(100)]
    public string? LoggedByJobTitle { get; set; }

    public string? LoggedBySignature { get; set; }

    public bool IsApproved { get; set; }

    public byte SignOffStage { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
}
