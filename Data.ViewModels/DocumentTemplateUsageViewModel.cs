using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentTemplateUsageViewModel
{
    [Key]
    public int DocumentTemplateUsageID { get; set; }

    public int DocumentTemplateID { get; set; }

    public int? DocumentID { get; set; }

    public int UsedByUserID { get; set; }

    public DateTimeOffset UsedDate { get; set; }

    [StringLength(255)]
    public string? GeneratedDocumentName { get; set; }

    public string? TagValuesUsed { get; set; }

    // Additional Properties
}
