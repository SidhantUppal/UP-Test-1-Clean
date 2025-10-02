using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DataStructure", Schema = "V7")]
public partial class DataStructure
{
    [Key]
    public int DataStructureID { get; set; }

    public int DataStructureTypeID { get; set; }

    public string DataStructureJSON { get; set; } = null!;

    [StringLength(256)]
    public string? DataStructureTitle { get; set; }

    public int? UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public bool IsTemplate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("DataStructureArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DataStructureCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("DataStructureTypeID")]
    [InverseProperty("DataStructures")]
    public virtual DataStructureType DataStructureType { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("DataStructureModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("DataStructures")]
    public virtual UserArea? UserArea { get; set; }
}
