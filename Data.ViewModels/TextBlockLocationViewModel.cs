using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TextBlockLocationViewModel
{
    [Key]
    public int TextBlockLocationID { get; set; }

    public int TextBlockID { get; set; }

    public int LocationID { get; set; }

    // Additional Properties
}
