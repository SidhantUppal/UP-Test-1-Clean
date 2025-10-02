using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionOptionListItem", Schema = "V7")]
public partial class QuestionOptionListItem
{
    [Key]
    public int QuestionOptionListItemID { get; set; }

    public int QuestionID { get; set; }

    public int OptionListItemID { get; set; }

    [ForeignKey("OptionListItemID")]
    [InverseProperty("QuestionOptionListItems")]
    public virtual OptionListItem OptionListItem { get; set; } = null!;

    [ForeignKey("QuestionID")]
    [InverseProperty("QuestionOptionListItems")]
    public virtual Question Question { get; set; } = null!;
}
