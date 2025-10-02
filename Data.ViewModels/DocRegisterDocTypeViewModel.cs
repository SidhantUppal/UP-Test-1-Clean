using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocRegisterDocTypeViewModel
{
    [Key]
    public int DocRegisterDocTypeID { get; set; }

    public int DocumentLinkTableTypeID { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    // Additional Properties
}
