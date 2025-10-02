using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCaseAttachmentViewModel
{
    [Key]
    public int HRCaseAttachmentID { get; set; }

    public int HRCaseID { get; set; }

    public int AttachmentID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public int? BundleOrderNum { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int HRCaseAttachmentTypeID { get; set; }

    public int? HRCaseStatusTypeID { get; set; }

    public int? HRCaseTaskID { get; set; }

    public int? HRCaseMeetingID { get; set; }

    public int? HRCaseEventID { get; set; }

    public int? HRCaseTemplateCategoryID { get; set; }

    public DateTimeOffset? AddedToBundleDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
