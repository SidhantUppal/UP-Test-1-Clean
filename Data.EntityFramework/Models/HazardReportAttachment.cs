using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HazardReportAttachment", Schema = "V7")]
public partial class HazardReportAttachment
{
    [Key]
    public int HazardReportAttachmentID { get; set; }

    public int HazardReportID { get; set; }

    public int AttachmentID { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("HazardReportAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("HazardReportID")]
    [InverseProperty("HazardReportAttachments")]
    public virtual HazardReport HazardReport { get; set; } = null!;
}
