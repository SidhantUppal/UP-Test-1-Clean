using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Case", Schema = "V7")]
[Index("Reference", Name = "UQ__Case__062B9EB8180E51F2", IsUnique = true)]
public partial class Case
{
    [Key]
    public int CaseID { get; set; }

    public int? ParentID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public int UserAreaID { get; set; }

    public int CaseStatusTypeID { get; set; }

    public int CaseTypeID { get; set; }

    public int TaskSeverityID { get; set; }

    public DateTimeOffset? DueDate { get; set; }

    public DateTimeOffset? ClosedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public byte PercentageComplete { get; set; }

    public bool IsPrivate { get; set; }

    public int? UserAreaDivisionID { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("CaseArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("Case")]
    public virtual ICollection<CaseAttachment> CaseAttachments { get; set; } = new List<CaseAttachment>();

    [InverseProperty("Case")]
    public virtual ICollection<CaseEmailNotification> CaseEmailNotifications { get; set; } = new List<CaseEmailNotification>();

    [InverseProperty("Case")]
    public virtual ICollection<CaseLog> CaseLogs { get; set; } = new List<CaseLog>();

    [InverseProperty("Case")]
    public virtual ICollection<CaseNote> CaseNotes { get; set; } = new List<CaseNote>();

    [ForeignKey("CaseStatusTypeID")]
    [InverseProperty("Cases")]
    public virtual CaseStatusType CaseStatusType { get; set; } = null!;

    [ForeignKey("CaseTypeID")]
    [InverseProperty("Cases")]
    public virtual CaseType CaseType { get; set; } = null!;

    [InverseProperty("Case")]
    public virtual ICollection<CaseUser> CaseUsers { get; set; } = new List<CaseUser>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CaseCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("Parent")]
    public virtual ICollection<Case> InverseParent { get; set; } = new List<Case>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("CaseModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("ParentID")]
    [InverseProperty("InverseParent")]
    public virtual Case? Parent { get; set; }

    [ForeignKey("TaskSeverityID")]
    [InverseProperty("Cases")]
    public virtual TaskSeverity TaskSeverity { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("Cases")]
    public virtual UserArea UserArea { get; set; } = null!;

    [ForeignKey("UserAreaDivisionID")]
    [InverseProperty("Cases")]
    public virtual UserAreaDivision? UserAreaDivision { get; set; }
}
