using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentOrgGroupViewModel
{
    [Key]
    public int RiskAssessmentOrgGroupID { get; set; }

    public int UserAreaID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int OrgGroupID { get; set; }

    public string? OrgGroupSpecificNotes { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
