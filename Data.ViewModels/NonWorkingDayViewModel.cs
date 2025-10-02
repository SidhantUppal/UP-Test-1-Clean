using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class NonWorkingDayViewModel
{
    [Key]
    public int NonWorkingDayID { get; set; }

    public int UserAreaID { get; set; }

    public int? OrgGroupID { get; set; }

    public int NonWorkingType { get; set; }

    public DateOnly Date { get; set; }

    [StringLength(256)]
    public string? Reason { get; set; }

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
