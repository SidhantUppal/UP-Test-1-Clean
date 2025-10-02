using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentBundleItemViewModel
{
    [Key]
    public int BundleItemID { get; set; }

    public int BundleID { get; set; }

    public int? DocumentID { get; set; }

    public int? DocumentTemplateID { get; set; }

    public int DisplayOrder { get; set; }

    public bool IsRequired { get; set; }

    public bool RequiresSignature { get; set; }

    [StringLength(50)]
    public string? SignatureType { get; set; }

    public string? Instructions { get; set; }

    public int? DueDaysOffset { get; set; }

    public string? Metadata { get; set; }

    // Additional Properties
}
