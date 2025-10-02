using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class MigrateV5TempChecklistQuestionnaireResponseViewModel
{
    public int ROWID { get; set; }

    public int? intTCRParentId { get; set; }

    public int UserID { get; set; }

    public int UserAreaID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public byte? Totalscore { get; set; }

    public int ChecklistId { get; set; }

    public decimal ChecklistVersion { get; set; }

    public int? ChecklistTemplateID { get; set; }

    public int? IncidentID { get; set; }

    public int? DepartmentID { get; set; }

    public int? EmployeeID { get; set; }

    public DateTimeOffset? UserInputDate { get; set; }

    public DateTimeOffset? Modified { get; set; }

    public bool Latest { get; set; }

    public string xmlTCRresponse { get; set; } = null!;

    [StringLength(1000)]
    public string? AccidentPersonTitle { get; set; }

    [StringLength(255)]
    public string? V5Reference { get; set; }

    [StringLength(255)]
    public string? V5AdditionalReference { get; set; }

    public DateTimeOffset? DateOfIncident { get; set; }

    public DateTimeOffset? DateLogged { get; set; }

    [StringLength(250)]
    public string? CompletedByTitle { get; set; }

    [StringLength(350)]
    public string? LocationTitle { get; set; }

    public int? V6QuestionnnaireResponseID { get; set; }

    public int? V6AccidentCaseID { get; set; }

    public int? V6AccidentPersonID { get; set; }

    // Additional Properties
}
