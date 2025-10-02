using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentRequirementViewModel
{
    [Key]
    public int RequirementID { get; set; }

    public int RequirementSetID { get; set; }

    [StringLength(255)]
    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    [StringLength(100)]
    public string? DocumentType { get; set; }

    public bool IsRequired { get; set; }

    [StringLength(50)]
    public string? ExpectedFormat { get; set; }

    public long? MaxFileSize { get; set; }

    public int? ValidityDays { get; set; }

    public int OrderIndex { get; set; }

    // Additional Properties
}
