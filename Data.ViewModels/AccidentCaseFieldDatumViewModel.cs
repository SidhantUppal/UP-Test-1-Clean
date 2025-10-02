using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AccidentCaseFieldDatumViewModel
{
    [Key]
    public int AccidentCaseFieldDataID { get; set; }

    public int AccidentCaseID { get; set; }

    public int AccidentFormID { get; set; }

    public int? AccidentQuestionTypeID { get; set; }

    public string? FieldValue { get; set; }

    public bool IncludeInCaseDetails { get; set; }

    public string? AdditionalValue { get; set; }

    public int? UserAreaAccidentQuestionID { get; set; }

    public int? ReportValue { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
