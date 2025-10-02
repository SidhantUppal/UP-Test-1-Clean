using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaQuestionTypeViewModel
{
    [Key]
    public int UserAreaQuestionTypeID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(250)]
    public string FieldName { get; set; } = null!;

    public int? OptionListID { get; set; }

    public int AnswerTypeID { get; set; }

    public int AccidentFormTypeID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    // Additional Properties
}
