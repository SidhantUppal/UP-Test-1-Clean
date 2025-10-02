using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocRegisterTask", Schema = "V7")]
[Index("UserAreaID", "DocumentLinkTableTypeID", "LatestDocumentID", Name = "IX_DocRegisterTask_LatestDocument_includes")]
[Index("UserAreaID", "DocumentLinkTableTypeID", "OriginalDocumentID", Name = "IX_DocRegisterTask_OriginalDocument_includes")]
[Index("UserAreaID", "TaskID", Name = "IX_DocRegisterTask_Task_includes")]
public partial class DocRegisterTask
{
    [Key]
    public int DocRegisterTaskID { get; set; }

    public int UserAreaID { get; set; }

    public int DocumentLinkTableTypeID { get; set; }

    public int OriginalDocumentID { get; set; }

    public int LatestDocumentID { get; set; }

    public int? TaskID { get; set; }

    public bool RequireReadAllAttachedForSigning { get; set; }

    public int? InductionEnrolmentID { get; set; }

    [ForeignKey("DocumentLinkTableTypeID")]
    [InverseProperty("DocRegisterTasks")]
    public virtual DocumentLinkTableType DocumentLinkTableType { get; set; } = null!;

    [ForeignKey("InductionEnrolmentID")]
    [InverseProperty("DocRegisterTasks")]
    public virtual InductionEnrolment? InductionEnrolment { get; set; }

    [ForeignKey("TaskID")]
    [InverseProperty("DocRegisterTasks")]
    public virtual BSSTask? Task { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("DocRegisterTasks")]
    public virtual UserArea UserArea { get; set; } = null!;
}
