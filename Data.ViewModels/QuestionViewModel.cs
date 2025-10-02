using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionViewModel
{
    [Key]
    public int QuestionID { get; set; }

    public int? UserAreaID { get; set; }

    public int ElementTypeID { get; set; }

    public int AnswerTypeID { get; set; }

    public int? OptionListID { get; set; }

    public int? QuestionnaireStaticDataTypeID { get; set; }

    public int QuestionnaireSectionID { get; set; }

    public int OrderNum { get; set; }

    public bool IsScored { get; set; }

    public bool IsQuestionResponseRequiredAttachment { get; set; }

    public bool IsQuestionValidationRequired { get; set; }

    public int? MaximumScore { get; set; }

    public int? AttachmentID { get; set; }

    public bool AllowComments { get; set; }

    public int? QuestionnaireTypeKeyFieldID { get; set; }

    public int? ParentID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    public bool IsReadOnly { get; set; }

    public bool IsNeededToPassed { get; set; }

    [StringLength(255)]
    public string? ParentIDValues { get; set; }

    public bool IsMandatory { get; set; }

    public bool AllowFurtherActions { get; set; }

    public bool IsPastDateDenied { get; set; }

    public bool IsFutureDateDenied { get; set; }

    public int? OriginalQuestionID { get; set; }

    public int? AnswerGridID { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
