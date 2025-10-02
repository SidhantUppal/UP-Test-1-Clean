using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Keyless]
[Table("MigrateV5TempChecklistQuestionnaireResponse", Schema = "V7")]
public partial class MigrateV5TempChecklistQuestionnaireResponse
{
    public int ROWID { get; set; }

    public int? intTCRParentId { get; set; }

    public int UserID { get; set; }

    public int UserAreaID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public byte? Totalscore { get; set; }

    public int ChecklistId { get; set; }

    [Column(TypeName = "decimal(4, 1)")]
    public decimal ChecklistVersion { get; set; }

    public int? ChecklistTemplateID { get; set; }

    public int? IncidentID { get; set; }

    public int? DepartmentID { get; set; }

    public int? EmployeeID { get; set; }

    public DateTimeOffset? UserInputDate { get; set; }

    public DateTimeOffset? Modified { get; set; }

    public bool Latest { get; set; }

    [Column(TypeName = "xml")]
    public string xmlTCRresponse { get; set; } = null!;

    [StringLength(1000)]
    public string? AccidentPersonTitle { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? V5Reference { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? V5AdditionalReference { get; set; }

    public DateTimeOffset? DateOfIncident { get; set; }

    public DateTimeOffset? DateLogged { get; set; }

    [StringLength(250)]
    [Unicode(false)]
    public string? CompletedByTitle { get; set; }

    [StringLength(350)]
    [Unicode(false)]
    public string? LocationTitle { get; set; }

    public int? V6QuestionnnaireResponseID { get; set; }

    public int? V6AccidentCaseID { get; set; }

    public int? V6AccidentPersonID { get; set; }
}
