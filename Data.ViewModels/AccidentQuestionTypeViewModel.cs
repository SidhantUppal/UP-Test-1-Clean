using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AccidentQuestionTypeViewModel
{
    [Key]
    public int AccidentQuestionTypeID { get; set; }

    public int AnswerTypeID { get; set; }

    [StringLength(50)]
    public string? AnswerTypeOptionsTable { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    [StringLength(50)]
    public string? FieldName { get; set; }

    [StringLength(20)]
    public string? ChildFieldPrefix { get; set; }

    [StringLength(50)]
    public string? FieldOptions { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    public string? AnswerTypeOptionsList { get; set; }

    // Additional Properties
}
