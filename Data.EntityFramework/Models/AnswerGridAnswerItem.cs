using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AnswerGridAnswerItem", Schema = "V7")]
public partial class AnswerGridAnswerItem
{
    [Key]
    public int AnswerGridAnswerItemID { get; set; }

    public int AnswerGridID { get; set; }

    public int AnswerGridAnswerID { get; set; }

    public int AnswerGridQuestionID { get; set; }

    [StringLength(256)]
    public string? Value { get; set; }

    public int? Score { get; set; }

    public int AnswerSeverity { get; set; }

    public int AnswerTypeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AnswerGridID")]
    [InverseProperty("AnswerGridAnswerItems")]
    public virtual AnswerGrid AnswerGrid { get; set; } = null!;

    [ForeignKey("AnswerGridAnswerID")]
    [InverseProperty("AnswerGridAnswerItems")]
    public virtual AnswerGridAnswer AnswerGridAnswer { get; set; } = null!;

    [ForeignKey("AnswerGridQuestionID")]
    [InverseProperty("AnswerGridAnswerItems")]
    public virtual AnswerGridQuestion AnswerGridQuestion { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AnswerGridAnswerItemArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AnswerGridAnswerItemCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AnswerGridAnswerItemModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
