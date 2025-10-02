using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCaseTextBlockCollectionViewModel
{
    [Key]
    public int HRCaseTextBlockCollectionID { get; set; }

    public int TextBlockCollectionID { get; set; }

    public int HRCaseID { get; set; }

    public int? HRCaseMeetingID { get; set; }

    // Additional Properties
}
