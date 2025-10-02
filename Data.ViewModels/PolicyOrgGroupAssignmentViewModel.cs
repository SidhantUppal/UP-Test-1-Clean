using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class PolicyOrgGroupAssignmentViewModel
{
    [Key]
    public int PolicyOrgGroupAssignmentID { get; set; }

    public int UserAreaID { get; set; }

    public int PolicyID { get; set; }

    public int OrgGroupID { get; set; }

    public DateTimeOffset AssignmentDate { get; set; }

    public DateTimeOffset? EffectiveDate { get; set; }

    public DateTimeOffset? DueDate { get; set; }

    public bool? IsMandatory { get; set; }

    public string? AssignmentNotes { get; set; }

    public string? SpecialInstructions { get; set; }

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
