using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ContractorRegisterViewModel
{
    [Key]
    public int ContractorRegisterID { get; set; }

    public int ContractorCompanyID { get; set; }

    public int? EmployeeID { get; set; }

    public DateTimeOffset? OnsiteFromDate { get; set; }

    public DateTimeOffset? OnsiteToDate { get; set; }

    public bool IsLatest { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? LocationID { get; set; }

    public string? WorkDetails { get; set; }

    [StringLength(100)]
    public string? IndividualName { get; set; }

    [StringLength(100)]
    public string? IndividualJobTitle { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
