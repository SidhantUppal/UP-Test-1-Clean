using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Licence", Schema = "V7")]
[Index("ArchivedDate", Name = "IX_ArchivedDate")]
[Index("ExpiryDate", Name = "IX_ExpiryDate")]
[Index("IsNotArchived", Name = "IX_IsNotArchived")]
[Index("UserAreaID", "ArchivedDate", Name = "IX_Licence_UserArea")]
public partial class Licence
{
    [Key]
    public int LicenceID { get; set; }

    public int UserAreaID { get; set; }

    public string? Notes { get; set; }

    public int? UserLimit { get; set; }

    public DateOnly? ExpiryDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int IsNotArchived { get; set; }

    [InverseProperty("Licence")]
    public virtual ICollection<LicenceHighLevelProductType> LicenceHighLevelProductTypes { get; set; } = new List<LicenceHighLevelProductType>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("Licences")]
    public virtual UserArea UserArea { get; set; } = null!;
}
