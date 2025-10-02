using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionnaireType", Schema = "V7")]
public partial class QuestionnaireType
{
    [Key]
    public int QuestionnaireTypeID { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? Reference { get; set; }

    public bool? IsELearning { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("QuestionnaireType")]
    public virtual ICollection<QuestionnaireTypeKeyField> QuestionnaireTypeKeyFields { get; set; } = new List<QuestionnaireTypeKeyField>();

    [InverseProperty("QuestionnaireType")]
    public virtual ICollection<Questionnaire> Questionnaires { get; set; } = new List<Questionnaire>();
}
