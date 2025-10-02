using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCaseStatusType", Schema = "V7")]
public partial class HRCaseStatusType
{
    [Key]
    public int HRCaseStatusTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int? HRTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HRCaseStatusTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HRCaseStatusTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("HRCaseStatusType")]
    public virtual ICollection<HRCaseAttachment> HRCaseAttachments { get; set; } = new List<HRCaseAttachment>();

    [InverseProperty("HRCaseStatusType")]
    public virtual ICollection<HRCaseMeeting> HRCaseMeetings { get; set; } = new List<HRCaseMeeting>();

    [InverseProperty("HRCaseStatusType")]
    public virtual ICollection<HRCaseNote> HRCaseNotes { get; set; } = new List<HRCaseNote>();

    [InverseProperty("HRCaseStatusType")]
    public virtual ICollection<HRCaseSupporter> HRCaseSupporters { get; set; } = new List<HRCaseSupporter>();

    [InverseProperty("HRCaseStatusType")]
    public virtual ICollection<HRCaseTask> HRCaseTasks { get; set; } = new List<HRCaseTask>();

    [InverseProperty("HRCaseStatusType")]
    public virtual ICollection<HRCase> HRCases { get; set; } = new List<HRCase>();

    [ForeignKey("HRTypeID")]
    [InverseProperty("HRCaseStatusTypes")]
    public virtual HRType? HRType { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HRCaseStatusTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("HRCaseStatusTypes")]
    public virtual UserArea? UserArea { get; set; }
}
