using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SafeSystemOfWorkCompetencyViewModel
{
    [Key]
    public int SafeSystemOfWorkCompetencyID { get; set; }

    public int SafeSystemOfWorkID { get; set; }

    public int CompetencyID { get; set; }

    // Additional Properties
}
