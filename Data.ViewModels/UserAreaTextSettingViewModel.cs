using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaTextSettingViewModel
{
    [Key]
    public int UserAreaTextSettingsID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(7)]
    public string? HeadingTextColour { get; set; }

    [StringLength(7)]
    public string? NormalTextColour { get; set; }

    [StringLength(50)]
    public string? HeadingTextFontName { get; set; }

    [StringLength(50)]
    public string? NormalTextFontName { get; set; }

    // Additional Properties
}
