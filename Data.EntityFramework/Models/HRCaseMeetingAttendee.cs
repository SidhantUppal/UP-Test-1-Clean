using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCaseMeetingAttendee", Schema = "V7")]
public partial class HRCaseMeetingAttendee
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

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HRCaseMeetingAttendeeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HRCaseMeetingAttendeeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("HRCaseMeetingAttendees")]
    public virtual Employee? Employee { get; set; }

    [ForeignKey("HRCaseMeetingID")]
    [InverseProperty("HRCaseMeetingAttendees")]
    public virtual HRCaseMeeting HRCaseMeeting { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HRCaseMeetingAttendeeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
