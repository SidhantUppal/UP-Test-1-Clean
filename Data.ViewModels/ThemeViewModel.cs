using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ThemeViewModel
{
    [Key]
    public int ThemeID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    [StringLength(255)]
    public string? CustomCultureRegionString { get; set; }

    public string? CssFolderRelativePath { get; set; }

    public string? ImagesFolderRelativePath { get; set; }

    [StringLength(255)]
    public string? LogoImageTitle { get; set; }

    public string? Description { get; set; }

    public int? LogoAttachmentID { get; set; }

    public int? OwnerUserAreaID { get; set; }

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
