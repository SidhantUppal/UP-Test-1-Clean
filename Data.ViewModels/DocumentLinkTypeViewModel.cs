using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentLinkTypeViewModel
{
    [Key]
    public int DocumentLinkTypeID { get; set; }

    [StringLength(50)]
    public string LinkName { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int? PermissionID { get; set; }

    // Additional Properties
}
