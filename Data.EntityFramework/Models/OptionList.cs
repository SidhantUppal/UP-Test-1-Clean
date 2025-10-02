using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("OptionList", Schema = "V7")]
[Index("QuestionnaireID", "Reference", "ArchivedDate", Name = "UK_OptionList_Reference", IsUnique = true)]
public partial class OptionList
{
    [Key]
    public int OptionListID { get; set; }

    public int? QuestionnaireID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(255)]
    public string? Reference { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("OptionListArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("OptionListCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("OptionListModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("OptionList")]
    public virtual ICollection<OptionListItem> OptionListItems { get; set; } = new List<OptionListItem>();

    [InverseProperty("OptionList")]
    public virtual ICollection<QuestionAnswer> QuestionAnswers { get; set; } = new List<QuestionAnswer>();

    [ForeignKey("QuestionnaireID")]
    [InverseProperty("OptionLists")]
    public virtual Questionnaire? Questionnaire { get; set; }

    [InverseProperty("OptionList")]
    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("OptionLists")]
    public virtual UserArea? UserArea { get; set; }

    [InverseProperty("OptionList")]
    public virtual ICollection<UserAreaQuestionType> UserAreaQuestionTypes { get; set; } = new List<UserAreaQuestionType>();
}
