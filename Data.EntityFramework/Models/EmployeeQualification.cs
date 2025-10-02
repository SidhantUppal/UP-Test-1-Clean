using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmployeeQualification", Schema = "V7")]
public partial class EmployeeQualification
{
    [Key]
    public int EmployeeQualificationID { get; set; }

    public int EmployeeID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    [StringLength(255)]
    public string? StudyLocation { get; set; }

    public DateTimeOffset? StartDate { get; set; }

    public DateTimeOffset? CompletionDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? AttachmentID { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("EmployeeQualificationArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("EmployeeQualifications")]
    public virtual Attachment? Attachment { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EmployeeQualificationCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("EmployeeQualifications")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("EmployeeQualificationModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
