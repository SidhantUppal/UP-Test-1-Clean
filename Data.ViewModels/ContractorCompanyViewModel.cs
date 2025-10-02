using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ContractorCompanyViewModel
{
    [Key]
    public int ContractorCompanyID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(256)]
    public string Name { get; set; } = null!;

    public int AddressID { get; set; }

    [StringLength(50)]
    public string? PhoneNumber { get; set; }

    public int ContractorCategoryID { get; set; }

    public int Status { get; set; }

    public string? Notes { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [StringLength(150)]
    public string? ContactName { get; set; }

    [StringLength(255)]
    public string? ContactEmail { get; set; }

    [StringLength(255)]
    public string? WebsiteURL { get; set; }

    public bool IsCompliantCachedValue { get; set; }

    public bool IsBlacklisted { get; set; }

    [StringLength(255)]
    public string? BlacklistedReason { get; set; }

    public int? DefaultChecklistID { get; set; }

    public int? CompletedQuestionnaireResponseID { get; set; }

    public bool AllowSignInWhenNonCompliant { get; set; }

    public int? ContractorTypeID { get; set; }

    public bool IsBranch { get; set; }

    public bool IsSignedOff { get; set; }

    public bool HasSubContractors { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
