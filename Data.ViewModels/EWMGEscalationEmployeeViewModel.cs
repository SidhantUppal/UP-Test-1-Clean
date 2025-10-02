using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class EWMGEscalationEmployeeViewModel
{
    [Key]
    public int EWMGEscalationEmployeeID { get; set; }

    public int MasterLocationID { get; set; }

    public int MasterOrgGroupID { get; set; }

    public int TaskAssigneeEmployeeID { get; set; }

    public int? Tier1ManagerEmployeeID { get; set; }

    public int? Tier2ManagerEmployeeID { get; set; }

    public int? Tier3ManagerEmployeeID { get; set; }

    public int? Tier4ManagerEmployeeID { get; set; }

    public int? Tier5ManagerEmployeeID { get; set; }

    public int? Tier6ManagerEmployeeID { get; set; }

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
