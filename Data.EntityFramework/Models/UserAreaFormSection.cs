using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaFormSection", Schema = "V7")]
public partial class UserAreaFormSection
{
    [Key]
    public int UserAreaFormSectionID { get; set; }

    public int? OriginalUserAreaFormSectionID { get; set; }

    public int UserAreaFormID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    [StringLength(1000)]
    public string? HelpText { get; set; }

    public byte OrderNum { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserAreaFormSectionArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaFormSectionCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaFormSectionModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaFormID")]
    [InverseProperty("UserAreaFormSections")]
    public virtual UserAreaForm UserAreaForm { get; set; } = null!;

    [InverseProperty("JumpToOriginalUserAreaFormSection")]
    public virtual ICollection<UserAreaFormQuestionAnswer> UserAreaFormQuestionAnswers { get; set; } = new List<UserAreaFormQuestionAnswer>();

    [InverseProperty("UserAreaFormSection")]
    public virtual ICollection<UserAreaFormQuestion> UserAreaFormQuestions { get; set; } = new List<UserAreaFormQuestion>();

    [InverseProperty("UserAreaFormSection")]
    public virtual ICollection<UserAreaFormSectionQuestion> UserAreaFormSectionQuestions { get; set; } = new List<UserAreaFormSectionQuestion>();
}
