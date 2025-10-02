using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CaseNoteViewModel
{
    [Key]
    public int CaseNoteID { get; set; }

    public int CaseID { get; set; }

    public string Notes { get; set; } = null!;

    public bool IsInternal { get; set; }

    public DateTimeOffset? ActionFromDate { get; set; }

    public DateTimeOffset? ActionToDate { get; set; }

    public decimal? ActionInHours { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
