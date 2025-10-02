using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaFormQuestionAnswer", Schema = "V7")]
public partial class UserAreaFormQuestionAnswer
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

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserAreaFormQuestionAnswerArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaFormQuestionAnswerCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("JumpToOriginalUserAreaFormSectionID")]
    [InverseProperty("UserAreaFormQuestionAnswers")]
    public virtual UserAreaFormSection? JumpToOriginalUserAreaFormSection { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaFormQuestionAnswerModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaFormQuestionID")]
    [InverseProperty("UserAreaFormQuestionAnswers")]
    public virtual UserAreaFormQuestion UserAreaFormQuestion { get; set; } = null!;
}
