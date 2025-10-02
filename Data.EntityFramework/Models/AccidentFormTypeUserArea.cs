using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentFormTypeUserArea", Schema = "V7")]
public partial class AccidentFormTypeUserArea
{
    [Key]
    public int AccidentFormTypeUserAreaID { get; set; }

    public int AccidentFormTypeID { get; set; }

    public int UserAreaID { get; set; }

    public bool IsEnabledForWeb { get; set; }

    public bool IsEnabledForApp { get; set; }

    [ForeignKey("AccidentFormTypeID")]
    [InverseProperty("AccidentFormTypeUserAreas")]
    public virtual AccidentFormType AccidentFormType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("AccidentFormTypeUserAreas")]
    public virtual UserArea UserArea { get; set; } = null!;
}
