using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TribunalCasePersonType", Schema = "V7")]
public partial class TribunalCasePersonType
{
    [Key]
    public int TribunalCasePersonTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TribunalCasePersonTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TribunalCasePersonTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TribunalCasePersonTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("TribunalCasePersonType")]
    public virtual ICollection<TribunalCaseAttachment> TribunalCaseAttachments { get; set; } = new List<TribunalCaseAttachment>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("TribunalCasePersonTypes")]
    public virtual UserArea? UserArea { get; set; }
}
