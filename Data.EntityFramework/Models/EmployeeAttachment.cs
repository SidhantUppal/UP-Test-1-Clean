using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmployeeAttachment", Schema = "V7")]
public partial class EmployeeAttachment
{
    [Key]
    public int EmployeeAttachmentID { get; set; }

    public int AttachmentID { get; set; }

    public int EmployeeID { get; set; }

    public int? CourseID { get; set; }

    public int? EmployeeFolderID { get; set; }

    public int? HRCaseAttachmentTypeID { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("EmployeeAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("CourseID")]
    [InverseProperty("EmployeeAttachments")]
    public virtual Course? Course { get; set; }

    [ForeignKey("EmployeeID")]
    [InverseProperty("EmployeeAttachments")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("EmployeeFolderID")]
    [InverseProperty("EmployeeAttachments")]
    public virtual EmployeeFolder? EmployeeFolder { get; set; }

    [ForeignKey("HRCaseAttachmentTypeID")]
    [InverseProperty("EmployeeAttachments")]
    public virtual HRCaseAttachmentType? HRCaseAttachmentType { get; set; }
}
