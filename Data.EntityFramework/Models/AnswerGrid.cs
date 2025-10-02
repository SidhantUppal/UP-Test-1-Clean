using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AnswerGrid", Schema = "V7")]
public partial class AnswerGrid
{
    [Key]
    public int AnswerGridID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(255)]
    public string? Reference { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public bool HideColumnHeadings { get; set; }

    public bool HideRowTitles { get; set; }

    [InverseProperty("AnswerGrid")]
    public virtual ICollection<AnswerGridAnswerItem> AnswerGridAnswerItems { get; set; } = new List<AnswerGridAnswerItem>();

    [InverseProperty("AnswerGrid")]
    public virtual ICollection<AnswerGridAnswer> AnswerGridAnswers { get; set; } = new List<AnswerGridAnswer>();

    [InverseProperty("AnswerGrid")]
    public virtual ICollection<AnswerGridQuestion> AnswerGridQuestions { get; set; } = new List<AnswerGridQuestion>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AnswerGridArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AnswerGridCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AnswerGridModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("AnswerGrid")]
    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("AnswerGrids")]
    public virtual UserArea? UserArea { get; set; }
}
