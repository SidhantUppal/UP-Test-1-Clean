using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ChecklistTemplate", Schema = "V7")]
public partial class ChecklistTemplate
{
    [Key]
    public int ChecklistTemplateID { get; set; }

    public int? UserAreaID { get; set; }

    public int OriginalUserAreaFormID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public bool IsRenewable { get; set; }

    public int? RenewalFrequencyTypeID { get; set; }

    public int? RenewalFrequencyPeriod { get; set; }

    public bool HasTasksAllowed { get; set; }

    public int? DefaultManagerEmployeeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ChecklistTemplateArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("ChecklistTemplate")]
    public virtual ICollection<ChecklistContent> ChecklistContents { get; set; } = new List<ChecklistContent>();

    [InverseProperty("ChecklistTemplate")]
    public virtual ICollection<ChecklistTemplateAssignment> ChecklistTemplateAssignments { get; set; } = new List<ChecklistTemplateAssignment>();

    [InverseProperty("ChecklistTemplate")]
    public virtual ICollection<ChecklistTemplateCategory> ChecklistTemplateCategories { get; set; } = new List<ChecklistTemplateCategory>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ChecklistTemplateCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("DefaultManagerEmployeeID")]
    [InverseProperty("ChecklistTemplates")]
    public virtual Employee? DefaultManagerEmployee { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ChecklistTemplateModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OriginalUserAreaFormID")]
    [InverseProperty("ChecklistTemplates")]
    public virtual UserAreaForm OriginalUserAreaForm { get; set; } = null!;

    [ForeignKey("RenewalFrequencyTypeID")]
    [InverseProperty("ChecklistTemplates")]
    public virtual FrequencyType? RenewalFrequencyType { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("ChecklistTemplates")]
    public virtual UserArea? UserArea { get; set; }
}
