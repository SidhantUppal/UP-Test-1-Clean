using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionnaireViewModel
{
    [Key]
    public int QuestionnaireID { get; set; }

    public int? OriginalQuestionnaireID { get; set; }

    public int QuestionnaireTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(50)]
    public string? PermissionKey { get; set; }

    public int MajorVersion { get; set; }

    public int MinorVersion { get; set; }

    public int? MaxScore { get; set; }

    public int? PassScore { get; set; }

    public int QuestionnaireStatusTypeID { get; set; }

    public int? QuestionnaireDisclaimerTypeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
