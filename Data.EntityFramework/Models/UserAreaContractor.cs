using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaContractor", Schema = "V7")]
[Index("UserAreaID", Name = "IX_UserAreaContractor_UserAreaID")]
public partial class UserAreaContractor
{
    [Key]
    public int UserAreaContractorID { get; set; }

    public int UserAreaID { get; set; }

    public int ContractorUserAreaID { get; set; }

    public bool IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserAreaContractorArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ContractorUserAreaID")]
    [InverseProperty("UserAreaContractorContractorUserAreas")]
    public virtual UserArea ContractorUserArea { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaContractorCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaContractorModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaContractorUserAreas")]
    public virtual UserArea UserArea { get; set; } = null!;
}
