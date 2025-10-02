using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaForm", Schema = "V7")]
public partial class UserAreaForm
{
    [Key]
    public int UserAreaFormID { get; set; }

    public int? OriginalUserAreaFormID { get; set; }

    public byte Version { get; set; }

    [StringLength(20)]
    public string Status { get; set; } = null!;

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public bool IsEnabledForWeb { get; set; }

    public bool IsEnabledForApp { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserAreaFormArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("OriginalUserAreaForm")]
    public virtual ICollection<ChecklistTemplate> ChecklistTemplates { get; set; } = new List<ChecklistTemplate>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaFormCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaFormModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaForms")]
    public virtual UserArea? UserArea { get; set; }

    [InverseProperty("UserAreaForm")]
    public virtual ICollection<UserAreaFormResponse> UserAreaFormResponses { get; set; } = new List<UserAreaFormResponse>();

    [InverseProperty("UserAreaForm")]
    public virtual ICollection<UserAreaFormSectionQuestion> UserAreaFormSectionQuestions { get; set; } = new List<UserAreaFormSectionQuestion>();

    [InverseProperty("UserAreaForm")]
    public virtual ICollection<UserAreaFormSection> UserAreaFormSections { get; set; } = new List<UserAreaFormSection>();
}
