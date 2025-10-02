using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Counsel", Schema = "V7")]
public partial class Counsel
{
    [Key]
    public int CounselID { get; set; }

    public int CounselUserID { get; set; }

    public int CounselEmployeeID { get; set; }

    public int? CounselChamberID { get; set; }

    [StringLength(50)]
    public string FullName { get; set; } = null!;

    [StringLength(100)]
    public string Email { get; set; } = null!;

    public int UserAreaID { get; set; }

    public DateTimeOffset? LastLoginDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("CounselArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CounselChamberID")]
    [InverseProperty("Counsels")]
    public virtual CounselChamber? CounselChamber { get; set; }

    [ForeignKey("CounselEmployeeID")]
    [InverseProperty("Counsels")]
    public virtual Employee CounselEmployee { get; set; } = null!;

    [ForeignKey("CounselUserID")]
    [InverseProperty("CounselCounselUsers")]
    public virtual User CounselUser { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CounselCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("CounselModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("Counsel")]
    public virtual ICollection<TribunalCaseCounsel> TribunalCaseCounsels { get; set; } = new List<TribunalCaseCounsel>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("Counsels")]
    public virtual UserArea UserArea { get; set; } = null!;
}
