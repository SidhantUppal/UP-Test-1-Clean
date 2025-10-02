using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AlertViewModel
{
    [Key]
    public int AlertID { get; set; }

    public int AlertTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int EmployeeID { get; set; }

    public int? SeverityTypeID { get; set; }

    public string? MoreInfo { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public DateTimeOffset? ReadDate { get; set; }

    public string? Description { get; set; }

    public int? SystemProductTypeID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
