using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HelpGuideViewModel
{
    [Key]
    public int HelpGuideID { get; set; }

    public int ModuleTypeID { get; set; }

    [StringLength(150)]
    public string Title { get; set; } = null!;

    [StringLength(255)]
    public string SourceURL { get; set; } = null!;

    public DateTimeOffset CreatedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
