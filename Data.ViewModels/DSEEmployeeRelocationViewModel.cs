using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DSEEmployeeRelocationViewModel
{
    [Key]
    public int DSEEmployeeRelocationID { get; set; }

    public int? EmployeeID { get; set; }

    public DateTimeOffset RelocationDate { get; set; }

    [StringLength(128)]
    public string? OldSeatNumber { get; set; }

    [StringLength(128)]
    public string? NewSeatNumber { get; set; }

    [StringLength(1024)]
    public string? RelocationReason { get; set; }

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
