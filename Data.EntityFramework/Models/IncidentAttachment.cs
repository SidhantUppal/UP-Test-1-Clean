using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("IncidentAttachment", Schema = "V7")]
[Index("AttachmentID", Name = "IX_IncidentAttachment_AttachmentID")]
[Index("IncidentCaseID", Name = "IX_IncidentAttachment_IncidentCaseID")]
public partial class IncidentAttachment
{
    [Key]
    public int IncidentAttachmentID { get; set; }

    public int IncidentCaseID { get; set; }

    public int AttachmentID { get; set; }

    [StringLength(50)]
    public string? FormType { get; set; }

    public DateTime CreatedDate { get; set; }

    public int CreatedByUserID { get; set; }
}
