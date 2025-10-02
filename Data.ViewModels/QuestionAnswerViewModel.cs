using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionAnswerViewModel
{
    [Key]
    public int QuestionAnswerID { get; set; }

    public int QuestionID { get; set; }

    public int AnswerTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int? OptionListID { get; set; }

    public string? OptionListValues { get; set; }

    public int? IntegerResponse { get; set; }

    public bool? BoolResponse { get; set; }

    public int? ScoreValue { get; set; }

    public int? JumpToSection { get; set; }

    public int? ActionTypeID { get; set; }

    public string? Comments { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    public int? ManagerEmployeeID { get; set; }

    public int AnswerSeverity { get; set; }

    public int? ManagerOrgGroupID { get; set; }

    public int? ManagerTypeID { get; set; }

    public int? DateRule { get; set; }

    [StringLength(30)]
    public string? DateRuleValue { get; set; }

    public int? TaskSeverityID { get; set; }

    public string? AnswerText { get; set; }

    public string? ActionText { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [StringLength(150)]
    public string? ActionTitle { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
