using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DSECase", Schema = "V7")]
public partial class DSECase
{
    [Key]
    public int DSECaseID { get; set; }

    public int UserAreaID { get; set; }

    public int EmployeeID { get; set; }

    public int DSECaseTypeID { get; set; }

    public int DSECaseStatusTypeID { get; set; }

    [StringLength(1000)]
    public string? Comments { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? ManagerEmployeeID { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("DSECaseArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DSECaseCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("DSECase")]
    public virtual ICollection<DSECaseAttachment> DSECaseAttachments { get; set; } = new List<DSECaseAttachment>();

    [InverseProperty("DSECase")]
    public virtual ICollection<DSECaseNote> DSECaseNotes { get; set; } = new List<DSECaseNote>();

    [ForeignKey("DSECaseStatusTypeID")]
    [InverseProperty("DSECases")]
    public virtual DSECaseStatusType DSECaseStatusType { get; set; } = null!;

    [InverseProperty("DSECase")]
    public virtual ICollection<DSECaseTask> DSECaseTasks { get; set; } = new List<DSECaseTask>();

    [ForeignKey("DSECaseTypeID")]
    [InverseProperty("DSECases")]
    public virtual DSECaseType DSECaseType { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("DSECases")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("DSECaseModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("DSECases")]
    public virtual UserArea UserArea { get; set; } = null!;
}
