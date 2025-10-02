using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AccidentFormQuestionnaireKeyTypeReportableFieldViewModel
{
    [Key]
    public int AccidentFormQuestionnaireKeyTypeReportableFieldID { get; set; }

    public int? UserAreaID { get; set; }

    public int AccidentFormTypeID { get; set; }

    public int QuestionnaireTypeKeyFieldID { get; set; }

    // Additional Properties
}
