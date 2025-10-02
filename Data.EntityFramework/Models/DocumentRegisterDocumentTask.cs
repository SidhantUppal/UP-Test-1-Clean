using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentRegisterDocumentTask", Schema = "V7")]
[Index("DocumentRegisterDocumentID", "TaskID", Name = "CK_DocumentRegisterDocumentTask_Unique", IsUnique = true)]
[Index("DocumentRegisterDocumentID", Name = "IX_DocumentRegisterDocumentTask_DocumentRegisterDocumentID_includes")]
[Index("TaskID", Name = "IX_DocumentRegisterDocumentTask_TaskID_includes")]
public partial class DocumentRegisterDocumentTask
{
    [Key]
    public int DocumentRegisterDocumentTaskID { get; set; }

    public int DocumentRegisterDocumentID { get; set; }

    public int TaskID { get; set; }

    [ForeignKey("DocumentRegisterDocumentID")]
    [InverseProperty("DocumentRegisterDocumentTasks")]
    public virtual DocumentRegisterDocument DocumentRegisterDocument { get; set; } = null!;

    [ForeignKey("TaskID")]
    [InverseProperty("DocumentRegisterDocumentTasks")]
    public virtual BSSTask Task { get; set; } = null!;
}
