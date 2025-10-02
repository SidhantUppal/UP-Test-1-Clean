using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("NotWorkingCategoryType", Schema = "V7")]
public partial class NotWorkingCategoryType
{
    [Key]
    public int NotWorkingCategoryTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("NotWorkingCategoryTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("NotWorkingCategoryTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("NotWorkingCategoryTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("NotWorkingCategoryTypes")]
    public virtual UserArea? UserArea { get; set; }
}
