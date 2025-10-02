using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCaseNoteViewModel
{
    [Key]
    public int HRCaseNoteID { get; set; }

    public string Note { get; set; } = null!;

    public int HRCaseID { get; set; }

    public int? HRCaseStatusTypeID { get; set; }

    public int? HRCategoryID { get; set; }

    public int? ImportanceGenericStatusTypeID { get; set; }

    public bool IsPrivate { get; set; }

    public bool IsViewableByClient { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? HRCaseMeetingID { get; set; }

    public int? HRCaseEventID { get; set; }

    public int? HRCaseTemplateCategoryID { get; set; }

    [StringLength(255)]
    public string? RelatedUserIDList { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
