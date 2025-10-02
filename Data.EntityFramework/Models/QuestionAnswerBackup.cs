using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Keyless]
[Table("QuestionAnswerBackup", Schema = "V7")]
public partial class QuestionAnswerBackup
{
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

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }
}
