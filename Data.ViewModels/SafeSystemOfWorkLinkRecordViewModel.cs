using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SafeSystemOfWorkLinkRecordViewModel
{
    [Key]
    public int SafeSystemOfWorkLinkRecordID { get; set; }

    public int SafeSystemOfWorkLinkID { get; set; }

    public int DocumentLinkTableTypeID { get; set; }

    public int RecordID { get; set; }

    // Additional Properties
}
