using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetDSEEmployeeViewModel
{
    [Key]
    public int AssetDSEEmployeeID { get; set; }

    public int AssetID { get; set; }

    public int EmployeeID { get; set; }

    public int AssetStatusTypeID { get; set; }

    public DateTimeOffset AssignmentDate { get; set; }

    [StringLength(255)]
    public string? Comments { get; set; }

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
