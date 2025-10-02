using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionnaireDisclaimerType", Schema = "V7")]
public partial class QuestionnaireDisclaimerType
{
    [Key]
    public int QuestionnaireDisclaimerTypeID { get; set; }

    public bool IsActive { get; set; }

    public string? Description { get; set; }

    [InverseProperty("QuestionnaireDisclaimerType")]
    public virtual ICollection<Questionnaire> Questionnaires { get; set; } = new List<Questionnaire>();
}
