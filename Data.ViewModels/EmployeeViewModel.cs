using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class EmployeeViewModel
{
    [Key]
    public int EmployeeID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(20)]
    public string? PersonTitleType { get; set; }

    [StringLength(20)]
    public string? GenderType { get; set; }

    [StringLength(255)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string Name { get; set; } = null!;

    [StringLength(255)]
    public string? Email { get; set; }

    public int? UserID { get; set; }

    public bool IsHidden { get; set; }

    public bool IsGloballyViewable { get; set; }

    public bool IsArchivableViaImport { get; set; }

    public bool IsHomeWorker { get; set; }

    public bool IsNotWorking { get; set; }

    public bool IsComputerUser { get; set; }

    public bool HasEmailsDisabled { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public DateOnly? AnnualReviewDate { get; set; }

    [StringLength(50)]
    public string? NINumber { get; set; }

    [StringLength(255)]
    public string? JobTitle { get; set; }

    [StringLength(255)]
    public string? Telephone { get; set; }

    [StringLength(255)]
    public string? Mobile { get; set; }

    public int? LineManagerEmployeeID { get; set; }

    public int? ProfileAttachmentID { get; set; }

    public string? Signature { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
