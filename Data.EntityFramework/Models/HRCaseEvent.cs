using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCaseEvent", Schema = "V7")]
public partial class HRCaseEvent
{
    [Key]
    public int HRCaseEventID { get; set; }

    public int HRCaseID { get; set; }

    public int? HRCaseMeetingID { get; set; }

    public int? HRCategoryID { get; set; }

    public short EventType { get; set; }

    public DateTimeOffset EventDate { get; set; }

    public DateTimeOffset? ExpiryDate { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [StringLength(2000)]
    public string? Description { get; set; }

    public short? EventOutcomeType { get; set; }

    [StringLength(256)]
    public string? EventLog { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HRCaseEventArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HRCaseEventCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("HRCaseID")]
    [InverseProperty("HRCaseEvents")]
    public virtual HRCase HRCase { get; set; } = null!;

    [InverseProperty("HRCaseEvent")]
    public virtual ICollection<HRCaseAttachment> HRCaseAttachments { get; set; } = new List<HRCaseAttachment>();

    [ForeignKey("HRCaseMeetingID")]
    [InverseProperty("HRCaseEvents")]
    public virtual HRCaseMeeting? HRCaseMeeting { get; set; }

    [InverseProperty("HRCaseEvent")]
    public virtual ICollection<HRCaseNote> HRCaseNotes { get; set; } = new List<HRCaseNote>();

    [InverseProperty("HRCaseEvent")]
    public virtual ICollection<HRCaseTask> HRCaseTasks { get; set; } = new List<HRCaseTask>();

    [ForeignKey("HRCategoryID")]
    [InverseProperty("HRCaseEvents")]
    public virtual HRCategory? HRCategory { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HRCaseEventModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
