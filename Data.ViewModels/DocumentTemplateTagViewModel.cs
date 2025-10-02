using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentTemplateTagViewModel
{
    [Key]
    public int DocumentTemplateTagID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(100)]
    public string TagName { get; set; } = null!;

    [StringLength(255)]
    public string DisplayName { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }

    [StringLength(50)]
    public string? Category { get; set; }

    [StringLength(20)]
    public string DataType { get; set; } = null!;

    [StringLength(500)]
    public string? SampleValue { get; set; }

    public bool IsSystemTag { get; set; }

    public bool IsActive { get; set; }

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
