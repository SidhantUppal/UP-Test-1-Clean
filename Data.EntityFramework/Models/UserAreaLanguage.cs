using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaLanguage", Schema = "V7")]
public partial class UserAreaLanguage
{
    [Key]
    public int UserAreaLanguageID { get; set; }

    public int UserAreaID { get; set; }

    public int LanguageTypeID { get; set; }

    public bool IsDefault { get; set; }

    [ForeignKey("LanguageTypeID")]
    [InverseProperty("UserAreaLanguages")]
    public virtual LanguageType LanguageType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaLanguages")]
    public virtual UserArea UserArea { get; set; } = null!;
}
