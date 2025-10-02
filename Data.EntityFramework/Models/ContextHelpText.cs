using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContextHelpText", Schema = "V7")]
[Index("AnchorPoint", "ControllerName", "ActionName", Name = "IX_ContextHelpText_FindByAnchorAndPage")]
public partial class ContextHelpText
{
    [Key]
    public int ContextHelpTextID { get; set; }

    [StringLength(100)]
    public string AnchorPoint { get; set; } = null!;

    [StringLength(100)]
    public string ControllerName { get; set; } = null!;

    [StringLength(100)]
    public string ActionName { get; set; } = null!;

    public bool IsLive { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? HelpText { get; set; }

    public bool UseIntroJS { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? AnchorElementName { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? AnchorCoordinates { get; set; }

    public int? ContextHelpTextStoryID { get; set; }

    public int? StoryItemOrderNum { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ContextHelpTextArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ContextHelpTextStoryID")]
    [InverseProperty("ContextHelpTexts")]
    public virtual ContextHelpTextStory? ContextHelpTextStory { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ContextHelpTextCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ContextHelpTextModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
