using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ImportRecordTypeViewModel
{
    [Key]
    public int ImportRecordTypeID { get; set; }

    [StringLength(50)]
    public string Title { get; set; } = null!;

    // Additional Properties
}
