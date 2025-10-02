using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AnonymousAccidentFormViewModel
{
    [Key]
    public int AnonymousAccidentFormID { get; set; }

    public int UserAreaID { get; set; }

    public int AccidentFormTypeID { get; set; }

    public DateTimeOffset IncidentDate { get; set; }

    [StringLength(15)]
    public string? IncidentTime { get; set; }

    [StringLength(250)]
    public string? AdditionalReference { get; set; }

    public byte TemplateVersion { get; set; }

    public string? XMLResponse { get; set; }

    public bool IsSpam { get; set; }

    [StringLength(100)]
    public string SubmittedByName { get; set; } = null!;

    public DateTimeOffset SubmittedDate { get; set; }

    public int? ProcessedByUserID { get; set; }

    public DateTimeOffset? ProcessedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? ArchivedByUserName { get; set; }
}
