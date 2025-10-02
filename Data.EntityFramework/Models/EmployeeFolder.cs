using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmployeeFolder", Schema = "V7")]
public partial class EmployeeFolder
{
    [Key]
    public int EmployeeFolderID { get; set; }

    public int UserAreaID { get; set; }

    public int? EmployeeID { get; set; }

    [StringLength(255)]
    public string Name { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("EmployeeFolderArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EmployeeFolderCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("EmployeeFolders")]
    public virtual Employee? Employee { get; set; }

    [InverseProperty("EmployeeFolder")]
    public virtual ICollection<EmployeeAttachment> EmployeeAttachments { get; set; } = new List<EmployeeAttachment>();

    [InverseProperty("EmployeeFolder")]
    public virtual ICollection<EmployeeTextBlock> EmployeeTextBlocks { get; set; } = new List<EmployeeTextBlock>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("EmployeeFolderModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("EmployeeFolders")]
    public virtual UserArea UserArea { get; set; } = null!;
}
