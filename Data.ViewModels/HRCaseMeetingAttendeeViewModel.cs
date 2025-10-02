using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCaseMeetingAttendeeViewModel
{
    [Key]
    public int HRCaseMeetingAttendeeID { get; set; }

    public int HRCaseMeetingID { get; set; }

    public short? AttendeeType { get; set; }

    public int? EmployeeID { get; set; }

    [StringLength(100)]
    public string? AttendeeName { get; set; }

    [StringLength(255)]
    public string? AttendeeEmail { get; set; }

    public DateTimeOffset? InvitationSentDate { get; set; }

    public bool HasAttended { get; set; }

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
