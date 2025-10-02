using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaSettingViewModel
{
    [Key]
    public int UserAreaSettingID { get; set; }

    public int UserAreaID { get; set; }

    public int IncidentInvestigationDueInDays { get; set; }

    public int DefaultManagerEmployeeID { get; set; }

    [StringLength(255)]
    public string? IncidentFormDisabledLocationIDList { get; set; }

    [StringLength(255)]
    public string? IncidentFormDisabledOrgGroupIDList { get; set; }

    [StringLength(255)]
    public string? DisabledEmailTypeIDList { get; set; }

    [StringLength(255)]
    public string? DefaultManagerEmail { get; set; }

    public int? DefaultSignOffEmployeeID { get; set; }

    public int? IncidentFormAlternativeSourceUserAreaID { get; set; }

    // Additional Properties
}
