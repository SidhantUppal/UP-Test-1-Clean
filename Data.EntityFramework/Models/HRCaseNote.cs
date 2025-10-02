using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCaseNote", Schema = "V7")]
[Index("HRCaseID", Name = "IX_HRCaseNote_HRCaseID_includes")]
public partial class HRCaseNote
{
    [Key]
    public int HRCaseNoteID { get; set; }

    public string Note { get; set; } = null!;

    public int HRCaseID { get; set; }

    public int? HRCaseStatusTypeID { get; set; }

    public int? HRCategoryID { get; set; }

    public int? ImportanceGenericStatusTypeID { get; set; }

    public bool IsPrivate { get; set; }

    public bool IsViewableByClient { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? HRCaseMeetingID { get; set; }

    public int? HRCaseEventID { get; set; }

    public int? HRCaseTemplateCategoryID { get; set; }

    [StringLength(255)]
    public string? RelatedUserIDList { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HRCaseNoteArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HRCaseNoteCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("HRCaseID")]
    [InverseProperty("HRCaseNotes")]
    public virtual HRCase HRCase { get; set; } = null!;

    [ForeignKey("HRCaseEventID")]
    [InverseProperty("HRCaseNotes")]
    public virtual HRCaseEvent? HRCaseEvent { get; set; }

    [ForeignKey("HRCaseMeetingID")]
    [InverseProperty("HRCaseNotes")]
    public virtual HRCaseMeeting? HRCaseMeeting { get; set; }

    [ForeignKey("HRCaseStatusTypeID")]
    [InverseProperty("HRCaseNotes")]
    public virtual HRCaseStatusType? HRCaseStatusType { get; set; }

    [ForeignKey("HRCaseTemplateCategoryID")]
    [InverseProperty("HRCaseNotes")]
    public virtual HRCaseTemplateCategory? HRCaseTemplateCategory { get; set; }

    [ForeignKey("HRCategoryID")]
    [InverseProperty("HRCaseNotes")]
    public virtual HRCategory? HRCategory { get; set; }

    [ForeignKey("ImportanceGenericStatusTypeID")]
    [InverseProperty("HRCaseNotes")]
    public virtual GenericStatusType? ImportanceGenericStatusType { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HRCaseNoteModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
