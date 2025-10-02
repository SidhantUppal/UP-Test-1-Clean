using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaTextSettings", Schema = "V7")]
[Index("UserAreaID", Name = "CK_UserAreaTextSettings_UserArea", IsUnique = true)]
public partial class UserAreaTextSetting
{
    [Key]
    public int UserAreaTextSettingsID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(7)]
    [Unicode(false)]
    public string? HeadingTextColour { get; set; }

    [StringLength(7)]
    [Unicode(false)]
    public string? NormalTextColour { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? HeadingTextFontName { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? NormalTextFontName { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaTextSetting")]
    public virtual UserArea UserArea { get; set; } = null!;
}
