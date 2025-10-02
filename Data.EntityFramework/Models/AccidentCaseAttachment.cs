using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentCaseAttachment", Schema = "V7")]
[Index("AccidentCaseID", Name = "IX_AccidentCaseAttachment_AccidentCaseID")]
public partial class AccidentCaseAttachment
{
    [Key]
    public int AccidentCaseAttachmentsID { get; set; }

    public int AccidentCaseID { get; set; }

    public int AttachmentID { get; set; }

    public int? AccidentFormTypeID { get; set; }

    public int? QuestionResponseID { get; set; }

    public int? AccidentFormID { get; set; }

    public int? AccidentFormTypeQuestionTypeID { get; set; }

    public int? UserAreaAccidentFormQuestionID { get; set; }

    [ForeignKey("AccidentCaseID")]
    [InverseProperty("AccidentCaseAttachments")]
    public virtual AccidentCase AccidentCase { get; set; } = null!;

    [ForeignKey("AccidentFormID")]
    [InverseProperty("AccidentCaseAttachments")]
    public virtual AccidentForm? AccidentForm { get; set; }

    [ForeignKey("AccidentFormTypeID")]
    [InverseProperty("AccidentCaseAttachments")]
    public virtual AccidentFormType? AccidentFormType { get; set; }

    [ForeignKey("AccidentFormTypeQuestionTypeID")]
    [InverseProperty("AccidentCaseAttachments")]
    public virtual AccidentFormTypeQuestionType? AccidentFormTypeQuestionType { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("AccidentCaseAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("QuestionResponseID")]
    [InverseProperty("AccidentCaseAttachments")]
    public virtual QuestionResponse? QuestionResponse { get; set; }

    [ForeignKey("UserAreaAccidentFormQuestionID")]
    [InverseProperty("AccidentCaseAttachments")]
    public virtual UserAreaAccidentFormQuestion? UserAreaAccidentFormQuestion { get; set; }
}
