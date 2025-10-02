using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RecruitmentVacancyAttachment", Schema = "V7")]
[Index("ContactID", Name = "IX_RecruitmentVacancyAttachment_ContactID_includes")]
[Index("RecruitmentVacancyApplicantID", Name = "IX_RecruitmentVacancyAttachment_RecruitmentVacancyApplicantID_includes")]
[Index("RecruitmentVacancyID", Name = "IX_RecruitmentVacancyAttachment_RecruitmentVacancyID_includes")]
public partial class RecruitmentVacancyAttachment
{
    [Key]
    public int RecruitmentVacancyAttachmentID { get; set; }

    public int RecruitmentVacancyAttachmentTypeID { get; set; }

    public int AttachmentID { get; set; }

    public int? RecruitmentVacancyID { get; set; }

    public int? RecruitmentVacancyApplicantID { get; set; }

    public int? ContactID { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("RecruitmentVacancyAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("ContactID")]
    [InverseProperty("RecruitmentVacancyAttachments")]
    public virtual Contact? Contact { get; set; }

    [ForeignKey("RecruitmentVacancyID")]
    [InverseProperty("RecruitmentVacancyAttachments")]
    public virtual RecruitmentVacancy? RecruitmentVacancy { get; set; }

    [ForeignKey("RecruitmentVacancyApplicantID")]
    [InverseProperty("RecruitmentVacancyAttachments")]
    public virtual RecruitmentVacancyApplicant? RecruitmentVacancyApplicant { get; set; }

    [ForeignKey("RecruitmentVacancyAttachmentTypeID")]
    [InverseProperty("RecruitmentVacancyAttachments")]
    public virtual RecruitmentVacancyAttachmentType RecruitmentVacancyAttachmentType { get; set; } = null!;
}
