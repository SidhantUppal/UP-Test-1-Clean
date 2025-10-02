using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TagType", Schema = "V7")]
public partial class TagType
{
    [Key]
    public int TagTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int? TypeCategoryID { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string Reference { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TagTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TagTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("TagType")]
    public virtual ICollection<EventTagType> EventTagTypes { get; set; } = new List<EventTagType>();

    [InverseProperty("AssumedLevelTagType")]
    public virtual ICollection<HRCase> HRCaseAssumedLevelTagTypes { get; set; } = new List<HRCase>();

    [InverseProperty("ConfirmedLevelTagType")]
    public virtual ICollection<HRCase> HRCaseConfirmedLevelTagTypes { get; set; } = new List<HRCase>();

    [InverseProperty("TagType")]
    public virtual ICollection<HRCaseTagType> HRCaseTagTypes { get; set; } = new List<HRCaseTagType>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TagTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("TagType")]
    public virtual ICollection<RecruitmentVacancyTagType> RecruitmentVacancyTagTypes { get; set; } = new List<RecruitmentVacancyTagType>();

    [InverseProperty("TagType")]
    public virtual ICollection<TribunalCaseAttachmentTagType> TribunalCaseAttachmentTagTypes { get; set; } = new List<TribunalCaseAttachmentTagType>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("TagTypes")]
    public virtual UserArea? UserArea { get; set; }

    [InverseProperty("TagType")]
    public virtual ICollection<UserAreaTag> UserAreaTags { get; set; } = new List<UserAreaTag>();

    [InverseProperty("TagType")]
    public virtual ICollection<WalkTemplate> WalkTemplates { get; set; } = new List<WalkTemplate>();

    [InverseProperty("TagType")]
    public virtual ICollection<Walk> Walks { get; set; } = new List<Walk>();
}
