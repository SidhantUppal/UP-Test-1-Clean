using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ContextHelpTextViewModel
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
    public string? AnchorElementName { get; set; }

    [StringLength(20)]
    public string? AnchorCoordinates { get; set; }

    public int? ContextHelpTextStoryID { get; set; }

    public int? StoryItemOrderNum { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
