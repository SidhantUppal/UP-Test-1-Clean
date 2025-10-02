using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentRegister", Schema = "V7")]
public partial class DocumentRegister
{
    [Key]
    public int DocumentRegisterID { get; set; }

    public int UserAreaID { get; set; }

    public int DocumentLinkTableTypeID { get; set; }

    [Column(TypeName = "decimal(4, 1)")]
    public decimal LatestVersion { get; set; }

    public DateTimeOffset DocumentCreatedDate { get; set; }

    public DateTimeOffset? DocumentModifiedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [StringLength(255)]
    public string? LatestReference { get; set; }

    [StringLength(255)]
    public string? LatestTitle { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("DocumentRegisterArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DocumentRegisterCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("DocumentLinkTableTypeID")]
    [InverseProperty("DocumentRegisters")]
    public virtual DocumentLinkTableType DocumentLinkTableType { get; set; } = null!;

    [InverseProperty("DocumentRegister")]
    public virtual ICollection<DocumentRegisterDocument> DocumentRegisterDocuments { get; set; } = new List<DocumentRegisterDocument>();

    [InverseProperty("DocumentRegister")]
    public virtual ICollection<DocumentRegisterEmployee> DocumentRegisterEmployees { get; set; } = new List<DocumentRegisterEmployee>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("DocumentRegisters")]
    public virtual UserArea UserArea { get; set; } = null!;
}
