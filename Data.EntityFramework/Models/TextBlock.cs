using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TextBlock", Schema = "V7")]
[Index("TextBlockTypeID", "UserAreaID", "ThemeID", Name = "IX_TextBlock_TextBlockTypeID_UserAreaID_ThemeID_includes")]
public partial class TextBlock
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

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TextBlockArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TextBlockCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("TextBlock")]
    public virtual ICollection<EmployeeTextBlock> EmployeeTextBlocks { get; set; } = new List<EmployeeTextBlock>();

    [ForeignKey("ExposureTypeID")]
    [InverseProperty("TextBlocks")]
    public virtual ExposureType? ExposureType { get; set; }

    [InverseProperty("OriginalTextBlock")]
    public virtual ICollection<TextBlock> InverseOriginalTextBlock { get; set; } = new List<TextBlock>();

    [InverseProperty("TemplateTextBlock")]
    public virtual ICollection<TextBlock> InverseTemplateTextBlock { get; set; } = new List<TextBlock>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TextBlockModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("TextBlocks")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("OriginalTextBlockID")]
    [InverseProperty("InverseOriginalTextBlock")]
    public virtual TextBlock? OriginalTextBlock { get; set; }

    [ForeignKey("TemplateTextBlockID")]
    [InverseProperty("InverseTemplateTextBlock")]
    public virtual TextBlock? TemplateTextBlock { get; set; }

    [InverseProperty("TextBlock")]
    public virtual ICollection<TextBlockApprovalLog> TextBlockApprovalLogs { get; set; } = new List<TextBlockApprovalLog>();

    [InverseProperty("TextBlock")]
    public virtual ICollection<TextBlockAttachment> TextBlockAttachments { get; set; } = new List<TextBlockAttachment>();

    [ForeignKey("TextBlockCategoryID")]
    [InverseProperty("TextBlocks")]
    public virtual TextBlockCategory? TextBlockCategory { get; set; }

    [ForeignKey("TextBlockCollectionID")]
    [InverseProperty("TextBlocks")]
    public virtual TextBlockCollection? TextBlockCollection { get; set; }

    [InverseProperty("TextBlock")]
    public virtual ICollection<TextBlockCourse> TextBlockCourses { get; set; } = new List<TextBlockCourse>();

    [InverseProperty("TextBlock")]
    public virtual ICollection<TextBlockEmployee> TextBlockEmployees { get; set; } = new List<TextBlockEmployee>();

    [InverseProperty("TextBlock")]
    public virtual ICollection<TextBlockLocation> TextBlockLocations { get; set; } = new List<TextBlockLocation>();

    [InverseProperty("TextBlock")]
    public virtual ICollection<TextBlockOrgGroup> TextBlockOrgGroups { get; set; } = new List<TextBlockOrgGroup>();

    [InverseProperty("TextBlock")]
    public virtual ICollection<TextBlockQuestionnaireSection> TextBlockQuestionnaireSections { get; set; } = new List<TextBlockQuestionnaireSection>();

    [ForeignKey("TextBlockSectionID")]
    [InverseProperty("TextBlocks")]
    public virtual TextBlockSection? TextBlockSection { get; set; }

    [ForeignKey("TextBlockStatusTypeID")]
    [InverseProperty("TextBlocks")]
    public virtual TextBlockStatusType TextBlockStatusType { get; set; } = null!;

    [ForeignKey("TextBlockTypeID")]
    [InverseProperty("TextBlocks")]
    public virtual TextBlockType TextBlockType { get; set; } = null!;

    [ForeignKey("ThemeID")]
    [InverseProperty("TextBlocks")]
    public virtual Theme? Theme { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("TextBlocks")]
    public virtual UserArea? UserArea { get; set; }

    [InverseProperty("TextBlock")]
    public virtual ICollection<UserAreaTextBlock> UserAreaTextBlocks { get; set; } = new List<UserAreaTextBlock>();

    [InverseProperty("TextBlock")]
    public virtual ICollection<UserTextBlock> UserTextBlocks { get; set; } = new List<UserTextBlock>();

    [ForeignKey("YesNoNATypeID")]
    [InverseProperty("TextBlocks")]
    public virtual YesNoNAType? YesNoNAType { get; set; }
}
