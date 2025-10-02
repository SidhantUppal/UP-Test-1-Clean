using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaAccidentFormViewModel
{
    [Key]
    public int UserAreaAccidentFormID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(20)]
    public string Reference { get; set; } = null!;

    public bool IsNonAccidentForm { get; set; }

    public byte LatestTemplateVersion { get; set; }

    public byte? LiveTemplateVersion { get; set; }

    public int? oldid { get; set; }

    public bool IsEnabledForWeb { get; set; }

    public bool IsEnabledForApp { get; set; }

    public int? InvestigationUserAreaAccidentFormID { get; set; }

    public bool IsSecondaryForm { get; set; }

    public bool AllowCompletionFromAlternativeUserArea { get; set; }

    public bool HasSeverityOptionEnabled { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    // Additional Properties
}
