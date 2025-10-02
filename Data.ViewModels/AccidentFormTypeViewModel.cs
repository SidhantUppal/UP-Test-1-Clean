using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AccidentFormTypeViewModel
{
    [Key]
    public int AccidentFormTypeID { get; set; }

    [StringLength(20)]
    public string Reference { get; set; } = null!;

    public bool? IsSecondaryForm { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public int? ParentFormTypeID { get; set; }

    public bool IsReportable { get; set; }

    public byte LatestTemplateVersion { get; set; }

    public int? UserAreaID { get; set; }

    public byte? LiveTemplateVersion { get; set; }

    public bool IsNonAccidentForm { get; set; }

    public int? InvestigationAccidentFormTypeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
