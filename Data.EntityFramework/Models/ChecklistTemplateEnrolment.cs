using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ChecklistTemplateEnrolment", Schema = "V7")]
public partial class ChecklistTemplateEnrolment
{
    [Key]
    public int ChecklistTemplateEnrolmentID { get; set; }

    public int ChecklistTemplateAssignmentID { get; set; }

    public int OriginalUserAreaFormResponseID { get; set; }

    public int? TaskID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ChecklistTemplateAssignmentID")]
    [InverseProperty("ChecklistTemplateEnrolments")]
    public virtual ChecklistTemplateAssignment ChecklistTemplateAssignment { get; set; } = null!;

    [ForeignKey("OriginalUserAreaFormResponseID")]
    [InverseProperty("ChecklistTemplateEnrolments")]
    public virtual UserAreaFormResponse OriginalUserAreaFormResponse { get; set; } = null!;

    [ForeignKey("TaskID")]
    [InverseProperty("ChecklistTemplateEnrolments")]
    public virtual BSSTask? Task { get; set; }
}
