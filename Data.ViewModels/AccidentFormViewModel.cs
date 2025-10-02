using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AccidentFormViewModel
{
    [Key]
    public int AccidentFormID { get; set; }

    public int AccidentCaseID { get; set; }

    public int? AccidentPersonID { get; set; }

    public int? QuestionnaireID { get; set; }

    public int? QuestionnaireResponseID { get; set; }

    public int AccidentFormStatusTypeID { get; set; }

    public int AccidentFormTypeID { get; set; }

    public int? UserAreaAccidentFormID { get; set; }

    public int UserAreaID { get; set; }

    public int? SeverityTypeID { get; set; }

    public int? OrigionalAccidentFormID { get; set; }

    public byte TemplateVersion { get; set; }

    public string? XMLResponse { get; set; }

    public byte Version { get; set; }

    public int? PreviousVersionID { get; set; }

    public int? OriginalAccidentFormID { get; set; }

    public int? OriginalPrimaryAccidentFormID { get; set; }

    [StringLength(36)]
    public string? SessionID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
