using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Import", Schema = "V7")]
public partial class Import
{
    [Key]
    public int ImportID { get; set; }

    public int ImportRecordTypeID { get; set; }

    public int ImportStatusTypeID { get; set; }

    public int UserAreaID { get; set; }

    public string? OriginalData { get; set; }

    public string? PreImportData { get; set; }

    public string? PostImportData { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public byte? ImportProgress { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ImportArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ImportCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ImportRecordTypeID")]
    [InverseProperty("Imports")]
    public virtual ImportRecordType ImportRecordType { get; set; } = null!;

    [ForeignKey("ImportStatusTypeID")]
    [InverseProperty("Imports")]
    public virtual ImportStatusType ImportStatusType { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ImportModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("Imports")]
    public virtual UserArea UserArea { get; set; } = null!;
}
