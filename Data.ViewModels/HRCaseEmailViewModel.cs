using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCaseEmailViewModel
{
    [Key]
    public int HRCaseEmailID { get; set; }

    public int HRCaseID { get; set; }

    public int EmailMessageID { get; set; }

    public int? HRCategoryID { get; set; }

    public int? ImportanceGenericStatusTypeID { get; set; }

    public bool IsViewableByClient { get; set; }

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
