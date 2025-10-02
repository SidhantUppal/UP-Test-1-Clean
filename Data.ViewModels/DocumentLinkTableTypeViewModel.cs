using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentLinkTableTypeViewModel
{
    [Key]
    public int DocumentLinkTableTypeID { get; set; }

    [StringLength(50)]
    public string TableName { get; set; } = null!;

    // Additional Properties
}
