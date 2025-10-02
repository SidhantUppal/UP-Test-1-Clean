using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentForm", Schema = "V7")]
[Index("AccidentCaseID", "UserAreaID", "ArchivedDate", "AccidentFormStatusTypeID", Name = "IX_AccidentForm_AccidentCaseID_UserAreaID_ArchivedDate_AccidentFormStatusTypeID")]
[Index("AccidentFormStatusTypeID", "UserAreaID", "ArchivedDate", "AccidentFormTypeID", "UserAreaAccidentFormID", Name = "IX_AccidentForm_AccidentFormStatusTypeID_UserAreaID_ArchivedDate_AccidentFormTypeID")]
[Index("OriginalPrimaryAccidentFormID", Name = "IX_AccidentForm_OriginalPrimaryAccidentFormID_Simple")]
public partial class AccidentForm
{
    [Key]
    public int AccidentFormID { get; set; }

    public int AccidentCaseID { get; set; }

    public int? AccidentPersonID { get; set; }

    public int? QuestionnaireID { get; set; }

    public int? QuestionnaireResponseID { get; set; }

    public int AccidentFormStatusTypeID { get; set; }

    public int AccidentFormTypeID { get; set; }

    public int? UserAreaAccidentFormID { get; set; }

    public int UserAreaID { get; set; }

    public int? SeverityTypeID { get; set; }

    public int? OrigionalAccidentFormID { get; set; }

    public byte TemplateVersion { get; set; }

    [Column(TypeName = "xml")]
    public string? XMLResponse { get; set; }

    public byte Version { get; set; }

    public int? PreviousVersionID { get; set; }

    public int? OriginalAccidentFormID { get; set; }

    public int? OriginalPrimaryAccidentFormID { get; set; }

    [StringLength(36)]
    public string? SessionID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AccidentCaseID")]
    [InverseProperty("AccidentForms")]
    public virtual AccidentCase AccidentCase { get; set; } = null!;

    [InverseProperty("AccidentForm")]
    public virtual ICollection<AccidentCaseAttachment> AccidentCaseAttachments { get; set; } = new List<AccidentCaseAttachment>();

    [InverseProperty("AccidentForm")]
    public virtual ICollection<AccidentCaseFieldDatum> AccidentCaseFieldData { get; set; } = new List<AccidentCaseFieldDatum>();

    [InverseProperty("AccidentForm")]
    public virtual ICollection<AccidentCasePersonDatum> AccidentCasePersonData { get; set; } = new List<AccidentCasePersonDatum>();

    [ForeignKey("AccidentFormStatusTypeID")]
    [InverseProperty("AccidentForms")]
    public virtual AccidentFormStatusType AccidentFormStatusType { get; set; } = null!;

    [ForeignKey("AccidentFormTypeID")]
    [InverseProperty("AccidentForms")]
    public virtual AccidentFormType AccidentFormType { get; set; } = null!;

    [ForeignKey("AccidentPersonID")]
    [InverseProperty("AccidentForms")]
    public virtual AccidentPerson? AccidentPerson { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AccidentFormArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AccidentFormCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("OriginalAccidentForm")]
    public virtual ICollection<AccidentForm> InverseOriginalAccidentForm { get; set; } = new List<AccidentForm>();

    [InverseProperty("OriginalPrimaryAccidentForm")]
    public virtual ICollection<AccidentForm> InverseOriginalPrimaryAccidentForm { get; set; } = new List<AccidentForm>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AccidentFormModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OriginalAccidentFormID")]
    [InverseProperty("InverseOriginalAccidentForm")]
    public virtual AccidentForm? OriginalAccidentForm { get; set; }

    [ForeignKey("OriginalPrimaryAccidentFormID")]
    [InverseProperty("InverseOriginalPrimaryAccidentForm")]
    public virtual AccidentForm? OriginalPrimaryAccidentForm { get; set; }

    [ForeignKey("QuestionnaireID")]
    [InverseProperty("AccidentForms")]
    public virtual Questionnaire? Questionnaire { get; set; }

    [ForeignKey("QuestionnaireResponseID")]
    [InverseProperty("AccidentForms")]
    public virtual QuestionnaireResponse? QuestionnaireResponse { get; set; }

    [ForeignKey("SeverityTypeID")]
    [InverseProperty("AccidentForms")]
    public virtual SeverityType? SeverityType { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("AccidentForms")]
    public virtual UserArea UserArea { get; set; } = null!;

    [ForeignKey("UserAreaAccidentFormID")]
    [InverseProperty("AccidentForms")]
    public virtual UserAreaAccidentForm? UserAreaAccidentForm { get; set; }
}
