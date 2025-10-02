using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ContextHelpTextStoryViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
