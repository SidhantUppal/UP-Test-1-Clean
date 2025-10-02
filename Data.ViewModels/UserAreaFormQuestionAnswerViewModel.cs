using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaFormQuestionAnswerViewModel
{
    [Key]
    public int UserAreaFormQuestionAnswerID { get; set; }

    public int? OriginalUserAreaFormQuestionAnswerID { get; set; }

    public int UserAreaFormQuestionID { get; set; }

    [StringLength(255)]
    public string AnswerText { get; set; } = null!;

    public byte OrderNum { get; set; }

    public byte? Weighting { get; set; }

    public byte? ScoreValue { get; set; }

    public int? JumpToOriginalUserAreaFormSectionID { get; set; }

    public string? ConfigData { get; set; }

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
