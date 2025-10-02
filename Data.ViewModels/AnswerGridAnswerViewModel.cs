using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AnswerGridAnswerViewModel
{
    [Key]
    public int AnswerGridAnswerID { get; set; }

    public int AnswerGridID { get; set; }

    [StringLength(256)]
    public string? AnswerTitle { get; set; }

    public int OrderIndex { get; set; }

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
