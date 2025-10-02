using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaFormQuestion", Schema = "V7")]
public partial class UserAreaFormQuestion
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

    [ForeignKey("AnswerTypeID")]
    [InverseProperty("UserAreaFormQuestions")]
    public virtual AnswerType AnswerType { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserAreaFormQuestionArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaFormQuestionCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaFormQuestionModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("UserAreaFormQuestion")]
    public virtual ICollection<UserAreaFormQuestionAnswer> UserAreaFormQuestionAnswers { get; set; } = new List<UserAreaFormQuestionAnswer>();

    [ForeignKey("UserAreaFormSectionID")]
    [InverseProperty("UserAreaFormQuestions")]
    public virtual UserAreaFormSection UserAreaFormSection { get; set; } = null!;

    [InverseProperty("UserAreaFormQuestion")]
    public virtual ICollection<UserAreaFormSectionQuestion> UserAreaFormSectionQuestions { get; set; } = new List<UserAreaFormSectionQuestion>();
}
