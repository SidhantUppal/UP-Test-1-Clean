using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ContractorCompetencyViewModel
{
    [Key]
    public int ContractorCompetencyID { get; set; }

    public int UserAreaID { get; set; }

    public int? ContractorCompanyID { get; set; }

    public int? EmployeeID { get; set; }

    public int CompetencyID { get; set; }

    public int? TemplateContractorCompetencyID { get; set; }

    public bool? IsInPlace { get; set; }

    public bool IsExempt { get; set; }

    public DateTimeOffset? ExemptionToDate { get; set; }

    public DateTimeOffset? ValidToDate { get; set; }

    public string? Comments { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? ContractorCompetencyStatusTypeID { get; set; }

    public bool IsOptional { get; set; }

    public bool IsEvidenceMandatory { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
