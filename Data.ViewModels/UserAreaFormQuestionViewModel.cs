using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaFormQuestionViewModel
{
    [Key]
    public int UserAreaFormQuestionID { get; set; }

    public int? OriginalUserAreaFormQuestionID { get; set; }

    public int UserAreaFormSectionID { get; set; }

    public int AnswerTypeID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public string? ConfigData { get; set; }

    public string? ParentIDAnswerValues { get; set; }

    [StringLength(50)]
    public string? AnswerTypeOptionsTable { get; set; }

    public string? AnswerTypeOptionsList { get; set; }

    public byte OrderNum { get; set; }

    public byte? Weighting { get; set; }

    public byte? MaxScore { get; set; }

    public bool IsMandatory { get; set; }

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
