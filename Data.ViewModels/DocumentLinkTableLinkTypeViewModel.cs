using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentLinkTableLinkTypeViewModel
{
    [Key]
    public int DocumentLinkTableLinkTypeID { get; set; }

    public int DocumentLinkTypeID { get; set; }

    public int DocumentLinkTableTypeID { get; set; }

    public int DocumentLinkTableChildTypeID { get; set; }

    // Additional Properties
}
