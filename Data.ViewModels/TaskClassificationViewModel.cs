using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TaskClassificationViewModel
{
    [Key]
    public int TaskClassificationID { get; set; }

    public int TaskID { get; set; }

    public int TaskClassificationTypeID { get; set; }

    // Additional Properties
}
