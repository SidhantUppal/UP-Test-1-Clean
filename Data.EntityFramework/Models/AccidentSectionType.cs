using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentSectionType", Schema = "V7")]
public partial class AccidentSectionType
{
    [Key]
    public int AccidentSectionTypeID { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(1000)]
    public string? HelpText { get; set; }

    public int? UserAreaID { get; set; }

    [InverseProperty("AccidentSectionType")]
    public virtual ICollection<AccidentFormTypeQuestionType> AccidentFormTypeQuestionTypes { get; set; } = new List<AccidentFormTypeQuestionType>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("AccidentSectionTypes")]
    public virtual UserArea? UserArea { get; set; }
}
