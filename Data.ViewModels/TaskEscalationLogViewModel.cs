using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TaskEscalationLogViewModel
{
    [Key]
    public int TaskEscalationLogID { get; set; }

    public int TaskID { get; set; }

    public int EscalationType { get; set; }

    public DateTimeOffset DateTime { get; set; }

    // Additional Properties
}
