using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TaskActivityViewModel
{
    [Key]
    public int TaskActivityID { get; set; }

    public int TaskID { get; set; }

    public int EmployeeID { get; set; }

    public DateTimeOffset ActivityDate { get; set; }

    public byte ActivityType { get; set; }

    [StringLength(100)]
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
