using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ValidationType", Schema = "V7")]
public partial class ValidationType
{
    [Key]
    public int ValidationTypeID { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string Reference { get; set; } = null!;

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("ValidationType")]
    public virtual ICollection<QuestionValidation> QuestionValidations { get; set; } = new List<QuestionValidation>();
}
