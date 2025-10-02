using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TribunalCaseAttachmentViewModel
{
    [Key]
    public int TribunalCaseAttachmentID { get; set; }

    public int TribunalCaseID { get; set; }

    public int AttachmentID { get; set; }

    public int TribunalCaseAttachmentTypeID { get; set; }

    public int TribunalCaseSeverityTypeID { get; set; }

    public int TribunalCasePersonTypeID { get; set; }

    public int? TribunalCaseEventTypeID { get; set; }

    public bool IsET1Related { get; set; }

    public bool IsET3Related { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public DateTimeOffset? DocumentDate { get; set; }

    public DateTimeOffset? AddedToBundleDate { get; set; }

    public int? BundleOrderNum { get; set; }

    // Additional Properties
}
