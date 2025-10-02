using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentPersonBodyPart", Schema = "V7")]
public partial class AccidentPersonBodyPart
{
    [Key]
    public int AccidentPersonBodyPartID { get; set; }

    public int AccidentPersonID { get; set; }

    public int BodyPartID { get; set; }

    [ForeignKey("AccidentPersonID")]
    [InverseProperty("AccidentPersonBodyParts")]
    public virtual AccidentPerson AccidentPerson { get; set; } = null!;

    [ForeignKey("BodyPartID")]
    [InverseProperty("AccidentPersonBodyParts")]
    public virtual BodyPart BodyPart { get; set; } = null!;
}
