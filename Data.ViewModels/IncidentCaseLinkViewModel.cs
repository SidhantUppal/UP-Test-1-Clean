using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class IncidentCaseLinkViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
