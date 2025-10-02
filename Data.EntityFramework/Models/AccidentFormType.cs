using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentFormType", Schema = "V7")]
public partial class AccidentFormType
{
    [Key]
    public int AccidentFormTypeID { get; set; }

    [StringLength(20)]
    public string Reference { get; set; } = null!;

    public bool? IsSecondaryForm { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public int? ParentFormTypeID { get; set; }

    public bool IsReportable { get; set; }

    public byte LatestTemplateVersion { get; set; }

    public int? UserAreaID { get; set; }

    public byte? LiveTemplateVersion { get; set; }

    public bool IsNonAccidentForm { get; set; }

    public int? InvestigationAccidentFormTypeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("AccidentFormType")]
    public virtual ICollection<AccidentCaseAttachment> AccidentCaseAttachments { get; set; } = new List<AccidentCaseAttachment>();

    [InverseProperty("LinkingAccidentFormType")]
    public virtual ICollection<AccidentFormCrossPopulationType> AccidentFormCrossPopulationTypeLinkingAccidentFormTypes { get; set; } = new List<AccidentFormCrossPopulationType>();

    [InverseProperty("MainAccidentFormType")]
    public virtual ICollection<AccidentFormCrossPopulationType> AccidentFormCrossPopulationTypeMainAccidentFormTypes { get; set; } = new List<AccidentFormCrossPopulationType>();

    [InverseProperty("AccidentFormType")]
    public virtual ICollection<AccidentFormQuestionnaireKeyTypeReportableField> AccidentFormQuestionnaireKeyTypeReportableFields { get; set; } = new List<AccidentFormQuestionnaireKeyTypeReportableField>();

    [InverseProperty("AccidentFormType")]
    public virtual ICollection<AccidentFormTypeQuestionType> AccidentFormTypeQuestionTypes { get; set; } = new List<AccidentFormTypeQuestionType>();

    [InverseProperty("AccidentFormType")]
    public virtual ICollection<AccidentFormTypeUserArea> AccidentFormTypeUserAreas { get; set; } = new List<AccidentFormTypeUserArea>();

    [InverseProperty("AccidentFormType")]
    public virtual ICollection<AccidentForm> AccidentForms { get; set; } = new List<AccidentForm>();

    [InverseProperty("AccidentFormType")]
    public virtual ICollection<AnonymousAccidentForm> AnonymousAccidentForms { get; set; } = new List<AnonymousAccidentForm>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AccidentFormTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AccidentFormTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("InvestigationAccidentFormType")]
    public virtual ICollection<AccidentFormType> InverseInvestigationAccidentFormType { get; set; } = new List<AccidentFormType>();

    [InverseProperty("ParentFormType")]
    public virtual ICollection<AccidentFormType> InverseParentFormType { get; set; } = new List<AccidentFormType>();

    [ForeignKey("InvestigationAccidentFormTypeID")]
    [InverseProperty("InverseInvestigationAccidentFormType")]
    public virtual AccidentFormType? InvestigationAccidentFormType { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AccidentFormTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("ParentFormTypeID")]
    [InverseProperty("InverseParentFormType")]
    public virtual AccidentFormType? ParentFormType { get; set; }

    [InverseProperty("AccidentFormType")]
    public virtual ICollection<QuestionnaireResponse> QuestionnaireResponses { get; set; } = new List<QuestionnaireResponse>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("AccidentFormTypes")]
    public virtual UserArea? UserArea { get; set; }

    [InverseProperty("AccidentFormType")]
    public virtual ICollection<UserAreaQuestionType> UserAreaQuestionTypes { get; set; } = new List<UserAreaQuestionType>();
}
