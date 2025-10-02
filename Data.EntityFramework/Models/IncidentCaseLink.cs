using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("IncidentCaseLink", Schema = "V7")]
[Index("LinkedRecordType", "LinkedRecordID", Name = "IX_IncidentCaseLink_LinkedRecord")]
[Index("SourceIncidentCaseID", Name = "IX_IncidentCaseLink_SourceIncident")]
[Index("UserAreaID", Name = "IX_IncidentCaseLink_UserAreaID")]
public partial class IncidentCaseLink
{
    [Key]
    public int IncidentCaseLinkID { get; set; }

    public int SourceIncidentCaseID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(100)]
    public string LinkedRecordType { get; set; } = null!;

    public int LinkedRecordID { get; set; }

    [StringLength(500)]
    public string? LinkedRecordTitle { get; set; }

    public string? LinkComments { get; set; }

    [StringLength(50)]
    public string? LinkType { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("SourceIncidentCaseID")]
    [InverseProperty("IncidentCaseLinks")]
    public virtual IncidentCase SourceIncidentCase { get; set; } = null!;
}
