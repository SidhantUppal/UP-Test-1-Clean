using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AbsenceTaskViewModel
{
    [Key]
    public int AbsenceTaskID { get; set; }

    public int TaskID { get; set; }

    public int AbsenceID { get; set; }

    // Additional Properties
}
