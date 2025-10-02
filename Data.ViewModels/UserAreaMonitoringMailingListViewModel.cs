using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaMonitoringMailingListViewModel
{
    [Key]
    public int UserAreaMonitoringMailingListID { get; set; }

    public int? V5MailingListID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(250)]
    public string? Name { get; set; }

    [StringLength(250)]
    public string? Email { get; set; }

    public int? EmployeeID { get; set; }

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
