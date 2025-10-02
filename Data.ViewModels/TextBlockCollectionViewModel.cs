using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TextBlockCollectionViewModel
{
    [Key]
    public int TextBlockCollectionID { get; set; }

    public int TextBlockTypeID { get; set; }

    public int TextBlockStatusTypeID { get; set; }

    public int? TextBlockCategoryID { get; set; }

    public int? OriginalTextBlockCollectionID { get; set; }

    public int? OrgGroupID { get; set; }

    public int UserAreaID { get; set; }

    public bool IsEnvironmental { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    [StringLength(255)]
    public string? Keywords { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public byte Version { get; set; }

    public int OrderNum { get; set; }

    public int? LocationID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public bool UseCalculatedVersion { get; set; }

    public int? TemplateTextBlockCollectionID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
