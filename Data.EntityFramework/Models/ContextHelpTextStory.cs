using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContextHelpTextStory", Schema = "V7")]
public partial class ContextHelpTextStory
{
    [Key]
    public int ContextHelpTextStoryID { get; set; }

    [StringLength(100)]
    public string StoryName { get; set; } = null!;

    [StringLength(1000)]
    public string? StoryDescription { get; set; }

    [StringLength(100)]
    public string ControllerName { get; set; } = null!;

    [StringLength(100)]
    public string ActionName { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ContextHelpTextStoryArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("ContextHelpTextStory")]
    public virtual ICollection<ContextHelpText> ContextHelpTexts { get; set; } = new List<ContextHelpText>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ContextHelpTextStoryCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ContextHelpTextStoryModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
