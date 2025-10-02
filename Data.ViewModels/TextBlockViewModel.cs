using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TextBlockViewModel
{
    [Key]
    public int TextBlockID { get; set; }

    public int TextBlockTypeID { get; set; }

    public int TextBlockStatusTypeID { get; set; }

    public int? TextBlockCollectionID { get; set; }

    public int? TextBlockCategoryID { get; set; }

    public int? TextBlockSectionID { get; set; }

    public int? OriginalTextBlockID { get; set; }

    public int? TemplateTextBlockID { get; set; }

    public int? UserAreaID { get; set; }

    public int? OrgGroupID { get; set; }

    [StringLength(40)]
    public string? Reference { get; set; }

    public int OrderNum { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Content { get; set; }

    [StringLength(255)]
    public string? RelatedURL { get; set; }

    [StringLength(255)]
    public string? Keywords { get; set; }

    public bool IsMultiLine { get; set; }

    public bool IsFixedTitle { get; set; }

    public bool CanUploadAttachments { get; set; }

    public int? YesNoNATypeID { get; set; }

    public bool? YesNoNAValue { get; set; }

    public bool IsEnvironmental { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? ThemeID { get; set; }

    public byte Version { get; set; }

    public int OrderType { get; set; }

    public int? tempid { get; set; }

    public DateTimeOffset? CopiedFromTemplateDate { get; set; }

    public Guid? SharedID { get; set; }

    public bool IsDSE { get; set; }

    public int? ExposureTypeID { get; set; }

    public byte? YesNoNAEnum { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
