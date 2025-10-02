using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionnaireResponseSignOffViewModel
{
    [Key]
    public int QuestionnaireResponseSignOffID { get; set; }

    public int PrimaryQuestionnaireResponseID { get; set; }

    public int SignOffQuestionnaireResponseID { get; set; }

    public byte OrderNum { get; set; }

    // Additional Properties
}
