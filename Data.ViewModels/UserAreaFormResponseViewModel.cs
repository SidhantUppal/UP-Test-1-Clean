using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaFormResponseViewModel
{
    [Key]
    public int UserAreaFormResponseID { get; set; }

    public int? OriginalUserAreaFormResponseID { get; set; }

    public byte Version { get; set; }

    [StringLength(20)]
    public string Status { get; set; } = null!;

    public int UserAreaFormID { get; set; }

    public int UserAreaID { get; set; }

    public int EmployeeID { get; set; }

    public int? LocationID { get; set; }

    public int? OrgGroupID { get; set; }

    [StringLength(100)]
    public string? Reference { get; set; }

    public string? QuestionResponseData { get; set; }

    [StringLength(1000)]
    public string? AttachmentIDList { get; set; }

    [StringLength(1000)]
    public string? TaskIDList { get; set; }

    public DateTimeOffset? SubmissionDate { get; set; }

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
