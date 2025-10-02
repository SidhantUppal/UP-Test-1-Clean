using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class OptionListItemViewModel
{
    [Key]
    public int OptionListItemID { get; set; }

    public int OptionListID { get; set; }

    public int Value { get; set; }

    public int? Score { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    public int? OrderIndex { get; set; }

    public int AnswerSeverity { get; set; }

    [StringLength(1000)]
    public string? Text { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
