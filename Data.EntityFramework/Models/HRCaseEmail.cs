using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCaseEmail", Schema = "V7")]
[Index("HRCaseID", Name = "IX_HRCaseEmail_HRCaseID_includes")]
public partial class HRCaseEmail
{
    [Key]
    public int HRCaseEmailID { get; set; }

    public int HRCaseID { get; set; }

    public int EmailMessageID { get; set; }

    public int? HRCategoryID { get; set; }

    public int? ImportanceGenericStatusTypeID { get; set; }

    public bool IsViewableByClient { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HRCaseEmailArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HRCaseEmailCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmailMessageID")]
    [InverseProperty("HRCaseEmails")]
    public virtual EmailMessage EmailMessage { get; set; } = null!;

    [ForeignKey("HRCaseID")]
    [InverseProperty("HRCaseEmails")]
    public virtual HRCase HRCase { get; set; } = null!;

    [ForeignKey("HRCategoryID")]
    [InverseProperty("HRCaseEmails")]
    public virtual HRCategory? HRCategory { get; set; }

    [ForeignKey("ImportanceGenericStatusTypeID")]
    [InverseProperty("HRCaseEmails")]
    public virtual GenericStatusType? ImportanceGenericStatusType { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HRCaseEmailModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
