using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("LegalRegisterLinkedRecord", Schema = "V7")]
public partial class LegalRegisterLinkedRecord
{
    [Key]
    public int LegalRegisterLinkedRecordID { get; set; }

    public int LegalRegisterID { get; set; }

    [StringLength(100)]
    public string LinkedRecordType { get; set; } = null!;

    public int LinkedRecordID { get; set; }

    [StringLength(500)]
    public string LinkedRecordTitle { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("LegalRegisterLinkedRecordArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("LegalRegisterLinkedRecordCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("LegalRegisterID")]
    [InverseProperty("LegalRegisterLinkedRecords")]
    public virtual LegalRegister1 LegalRegister { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("LegalRegisterLinkedRecordModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
