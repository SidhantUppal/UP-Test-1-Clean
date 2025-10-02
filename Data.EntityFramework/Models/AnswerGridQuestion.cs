using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AnswerGridQuestion", Schema = "V7")]
public partial class AnswerGridQuestion
{
    [Key]
    public int AnswerGridQuestionID { get; set; }

    public int AnswerGridID { get; set; }

    [StringLength(256)]
    public string? QuestionTitle { get; set; }

    public int OrderIndex { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AnswerGridID")]
    [InverseProperty("AnswerGridQuestions")]
    public virtual AnswerGrid AnswerGrid { get; set; } = null!;

    [InverseProperty("AnswerGridQuestion")]
    public virtual ICollection<AnswerGridAnswerItem> AnswerGridAnswerItems { get; set; } = new List<AnswerGridAnswerItem>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AnswerGridQuestionArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AnswerGridQuestionCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AnswerGridQuestionModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
