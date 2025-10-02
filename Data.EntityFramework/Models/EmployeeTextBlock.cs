using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmployeeTextBlock", Schema = "V7")]
public partial class EmployeeTextBlock
{
    [Key]
    public int EmployeeTextBlockID { get; set; }

    public int TextBlockID { get; set; }

    public int EmployeeID { get; set; }

    public int UserAreaID { get; set; }

    public int? EmployeeFolderID { get; set; }

    public int? TaskID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("EmployeeTextBlockArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EmployeeTextBlockCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("EmployeeTextBlocks")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("EmployeeFolderID")]
    [InverseProperty("EmployeeTextBlocks")]
    public virtual EmployeeFolder? EmployeeFolder { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("EmployeeTextBlockModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("TaskID")]
    [InverseProperty("EmployeeTextBlocks")]
    public virtual BSSTask? Task { get; set; }

    [ForeignKey("TextBlockID")]
    [InverseProperty("EmployeeTextBlocks")]
    public virtual TextBlock TextBlock { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("EmployeeTextBlocks")]
    public virtual UserArea UserArea { get; set; } = null!;
}
