using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaDocRegisterDocType", Schema = "V7")]
[Index("UserAreaID", Name = "IX_UserAreaDocRegisterDocType_UserAreaID_includes")]
public partial class UserAreaDocRegisterDocType
{
    [Key]
    public int UserAreaDocRegisterDocTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int DocRegisterDocTypeID { get; set; }

    [ForeignKey("DocRegisterDocTypeID")]
    [InverseProperty("UserAreaDocRegisterDocTypes")]
    public virtual DocRegisterDocType DocRegisterDocType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaDocRegisterDocTypes")]
    public virtual UserArea UserArea { get; set; } = null!;
}
