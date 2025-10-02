using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("OptionListItem", Schema = "V7")]
[Index("OptionListID", "ArchivedDate", Name = "IX_OptionListItem_OptionListID_ArchivedDate_includes")]
public partial class OptionListItem
{
    [Key]
    public int OptionListItemID { get; set; }

    public int OptionListID { get; set; }

    public int Value { get; set; }

    public int? Score { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    public int? OrderIndex { get; set; }

    public int AnswerSeverity { get; set; }

    [StringLength(1000)]
    public string? Text { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("OptionListItem")]
    public virtual ICollection<AccidentCase> AccidentCases { get; set; } = new List<AccidentCase>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("OptionListItemArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("OptionListItemCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("OptionListItemModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OptionListID")]
    [InverseProperty("OptionListItems")]
    public virtual OptionList OptionList { get; set; } = null!;

    [InverseProperty("OptionListItem")]
    public virtual ICollection<QuestionOptionListItem> QuestionOptionListItems { get; set; } = new List<QuestionOptionListItem>();
}
