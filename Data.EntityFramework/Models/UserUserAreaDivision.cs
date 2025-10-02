using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserUserAreaDivision", Schema = "V7")]
public partial class UserUserAreaDivision
{
    [Key]
    public int UserUserAreaDivisionID { get; set; }

    public int UserID { get; set; }

    public int UserAreaDivisionID { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("UserUserAreaDivisions")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaDivisionID")]
    [InverseProperty("UserUserAreaDivisions")]
    public virtual UserAreaDivision UserAreaDivision { get; set; } = null!;
}
