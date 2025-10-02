using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("LicenceHighLevelProductType", Schema = "V7")]
[Index("LicenceID", "HighLevelProductTypeID", Name = "CK_LicenceProductType_Unique", IsUnique = true)]
public partial class LicenceHighLevelProductType
{
    [Key]
    public int LicenceProductTypeID { get; set; }

    public int LicenceID { get; set; }

    public int HighLevelProductTypeID { get; set; }

    [ForeignKey("HighLevelProductTypeID")]
    [InverseProperty("LicenceHighLevelProductTypes")]
    public virtual HighLevelProductType HighLevelProductType { get; set; } = null!;

    [ForeignKey("LicenceID")]
    [InverseProperty("LicenceHighLevelProductTypes")]
    public virtual Licence Licence { get; set; } = null!;
}
