using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AccidentCaseAttachmentViewModel
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

    // Additional Properties
}
