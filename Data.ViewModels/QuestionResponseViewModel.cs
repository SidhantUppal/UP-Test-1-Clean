using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionResponseViewModel
{
    [Key]
    public int QuestionResponseID { get; set; }

    public int QuestionnaireResponseID { get; set; }

    public int QuestionID { get; set; }

    public int UserAreaID { get; set; }

    public int AnswerTypeID { get; set; }

    public string? ResponseText { get; set; }

    public string? OptionListResponse { get; set; }

    public int? IntegerResponse { get; set; }

    public bool? BoolResponse { get; set; }

    public DateTimeOffset? DateResponse { get; set; }

    public string? StaticDataResponse { get; set; }

    public string? Comments { get; set; }

    public int? AttachmentID { get; set; }

    [StringLength(2000)]
    public string? Attachments { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int MajorMinorNonConformityScore { get; set; }

    public bool IsSkipped { get; set; }

    public bool IsHidden { get; set; }

    public string? AnswerGridResponse { get; set; }

    public string? WELResponse { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
