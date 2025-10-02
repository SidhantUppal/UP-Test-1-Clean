using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AnswerGridAnswer", Schema = "V7")]
public partial class AnswerGridAnswer
{
    [Key]
    public int AnswerGridAnswerID { get; set; }

    public int AnswerGridID { get; set; }

    [StringLength(256)]
    public string? AnswerTitle { get; set; }

    public int OrderIndex { get; set; }

    public int AnswerTypeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AnswerGridID")]
    [InverseProperty("AnswerGridAnswers")]
    public virtual AnswerGrid AnswerGrid { get; set; } = null!;

    [InverseProperty("AnswerGridAnswer")]
    public virtual ICollection<AnswerGridAnswerItem> AnswerGridAnswerItems { get; set; } = new List<AnswerGridAnswerItem>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AnswerGridAnswerArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AnswerGridAnswerCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AnswerGridAnswerModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
