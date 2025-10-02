using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionAnswer", Schema = "V7")]
[Index("QuestionID", "JumpToSection", "ArchivedDate", "UserAreaID", Name = "IX_QuestionAnswer_JumpSection_Archived_UserArea")]
public partial class QuestionAnswer
{
    [Key]
    public int QuestionAnswerID { get; set; }

    public int QuestionID { get; set; }

    public int AnswerTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int? OptionListID { get; set; }

    [Unicode(false)]
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
    [Unicode(false)]
    public string? DateRuleValue { get; set; }

    public int? TaskSeverityID { get; set; }

    public string? AnswerText { get; set; }

    public string? ActionText { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [StringLength(150)]
    public string? ActionTitle { get; set; }

    [ForeignKey("ActionTypeID")]
    [InverseProperty("QuestionAnswers")]
    public virtual ActionType? ActionType { get; set; }

    [ForeignKey("AnswerTypeID")]
    [InverseProperty("QuestionAnswers")]
    public virtual AnswerType AnswerType { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("QuestionAnswerArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("QuestionAnswerCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("JumpToSection")]
    [InverseProperty("QuestionAnswers")]
    public virtual QuestionnaireSection? JumpToSectionNavigation { get; set; }

    [ForeignKey("ManagerEmployeeID")]
    [InverseProperty("QuestionAnswers")]
    public virtual Employee? ManagerEmployee { get; set; }

    [ForeignKey("ManagerOrgGroupID")]
    [InverseProperty("QuestionAnswers")]
    public virtual OrgGroup? ManagerOrgGroup { get; set; }

    [ForeignKey("ManagerTypeID")]
    [InverseProperty("QuestionAnswers")]
    public virtual ManagerType? ManagerType { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("QuestionAnswerModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OptionListID")]
    [InverseProperty("QuestionAnswers")]
    public virtual OptionList? OptionList { get; set; }

    [ForeignKey("QuestionID")]
    [InverseProperty("QuestionAnswers")]
    public virtual Question Question { get; set; } = null!;

    [ForeignKey("TaskSeverityID")]
    [InverseProperty("QuestionAnswers")]
    public virtual TaskSeverity? TaskSeverity { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("QuestionAnswers")]
    public virtual UserArea? UserArea { get; set; }
}
