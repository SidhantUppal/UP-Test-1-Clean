using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocPackItem", Schema = "V7")]
public partial class DocPackItem
{
    [Key]
    public int DocPackItemID { get; set; }

    public int DocPackID { get; set; }

    [StringLength(100)]
    public string ItemTableName { get; set; } = null!;

    public int ItemOriginalID { get; set; }

    public int ItemID { get; set; }

    [StringLength(255)]
    public string ItemTitle { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("DocPackItemArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DocPackItemCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("DocPackID")]
    [InverseProperty("DocPackItems")]
    public virtual DocPack DocPack { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("DocPackItemModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
