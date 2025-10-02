using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RIDDORSubmissionViewModel
{
    [Key]
    public int RIDDORSubmissionID { get; set; }

    public int UserAreaID { get; set; }

    public int AccidentCaseID { get; set; }

    public string XMLContent { get; set; } = null!;

    public DateTimeOffset SubmissionDate { get; set; }

    [StringLength(255)]
    public string EmailTo { get; set; } = null!;

    [StringLength(255)]
    public string EmailFrom { get; set; } = null!;

    public bool? IsValid { get; set; }

    [StringLength(255)]
    public string? Note { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [StringLength(30)]
    public string Reference { get; set; } = null!;

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
