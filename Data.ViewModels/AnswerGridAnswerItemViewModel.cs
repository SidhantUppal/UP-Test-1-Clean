using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AnswerGridAnswerItemViewModel
{
    [Key]
    public int AnswerGridAnswerItemID { get; set; }

    public int AnswerGridID { get; set; }

    public int AnswerGridAnswerID { get; set; }

    public int AnswerGridQuestionID { get; set; }

    [StringLength(256)]
    public string? Value { get; set; }

    public int? Score { get; set; }

    public int AnswerSeverity { get; set; }

    public int AnswerTypeID { get; set; }

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
