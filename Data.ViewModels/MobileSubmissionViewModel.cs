using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class MobileSubmissionViewModel
{
    [Key]
    public int MobileSubmissionID { get; set; }

    public int? QuestionnaireResponseID { get; set; }

    public int? AccidentCaseID { get; set; }

    public int? TaskID { get; set; }

    public int? AssetInspectionID { get; set; }

    public int? UserAreaID { get; set; }

    public bool IsProcessed { get; set; }

    public DateTimeOffset SubmissionDate { get; set; }

    public DateTimeOffset? ProcessedDate { get; set; }

    public int? RiskAssessmentID { get; set; }

    public int? RiskAssessmentMonitorEventID { get; set; }

    // Additional Properties
}
