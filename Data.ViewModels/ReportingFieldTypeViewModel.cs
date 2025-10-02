using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ReportingFieldTypeViewModel
{
    [Key]
    public int ReportingFieldTypeID { get; set; }

    [StringLength(50)]
    public string FieldName { get; set; } = null!;

    public int AnswerTypeID { get; set; }

    [StringLength(50)]
    public string? AnswerTypeOptionsTable { get; set; }

    public bool IsRIDDORReportable { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    // Additional Properties
}
