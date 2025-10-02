using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("InjuryTypeBodyPart", Schema = "V7")]
public partial class InjuryTypeBodyPart
{
    [Key]
    public int InjuryTypeBodyPartID { get; set; }

    public int InjuryTypeID { get; set; }

    public int? BodyPartID { get; set; }

    public bool IsRIDDOrReportable { get; set; }

    [ForeignKey("BodyPartID")]
    [InverseProperty("InjuryTypeBodyParts")]
    public virtual BodyPart? BodyPart { get; set; }

    [ForeignKey("InjuryTypeID")]
    [InverseProperty("InjuryTypeBodyParts")]
    public virtual InjuryType InjuryType { get; set; } = null!;
}
