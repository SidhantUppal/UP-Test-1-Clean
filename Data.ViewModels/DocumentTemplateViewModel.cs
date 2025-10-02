using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentTemplateViewModel
{
    [Key]
    public int DocumentTemplateID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public string Content { get; set; } = null!;

    [StringLength(50)]
    public string DocumentType { get; set; } = null!;

    [StringLength(100)]
    public string? Category { get; set; }

    public string? Tags { get; set; }

    public string? PlaceholderTags { get; set; }

    [StringLength(20)]
    public string Version { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsPublic { get; set; }

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
