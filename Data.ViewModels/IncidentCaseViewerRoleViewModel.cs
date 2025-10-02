using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class IncidentCaseViewerRoleViewModel
{
    [Key]
    public int IncidentCaseViewerRoleID { get; set; }

    public int UserAreaID { get; set; }

    public int RoleID { get; set; }

    // Additional Properties
}
