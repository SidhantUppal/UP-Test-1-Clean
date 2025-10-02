using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionnaireStatusType", Schema = "V7")]
public partial class QuestionnaireStatusType
{
    [Key]
    public int QuestionnaireStatusTypeID { get; set; }

    public bool? IsVisible { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }
}
