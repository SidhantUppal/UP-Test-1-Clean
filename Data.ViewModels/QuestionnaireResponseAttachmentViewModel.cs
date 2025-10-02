using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionnaireResponseAttachmentViewModel
{
    [Key]
    public int QuestionnaireResponseAttachment1 { get; set; }

    public int QuestionnaireResponseID { get; set; }

    public int AttachmentID { get; set; }

    // Additional Properties
}
