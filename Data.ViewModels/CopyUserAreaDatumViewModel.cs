using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CopyUserAreaDatumViewModel
{
    [Key]
    public int CopyUserAreaDataID { get; set; }

    public int? CopiedUserAreaID { get; set; }

    public int? NewUserAreaID { get; set; }

    [StringLength(255)]
    public string? TypeName { get; set; }

    public int? CopiedID { get; set; }

    public int? NewID { get; set; }

    public int? CopiedParentID { get; set; }

    public int? NewParentID { get; set; }

    // Additional Properties
}
