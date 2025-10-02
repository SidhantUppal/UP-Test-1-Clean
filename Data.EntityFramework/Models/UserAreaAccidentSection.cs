using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaAccidentSection", Schema = "V7")]
public partial class UserAreaAccidentSection
{
    [Key]
    public int UserAreaAccidentSectionID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public int? oldid { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    [StringLength(1000)]
    public string? HelpText { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaAccidentSections")]
    public virtual UserArea UserArea { get; set; } = null!;

    [InverseProperty("UserAreaAccidentSection")]
    public virtual ICollection<UserAreaAccidentFormQuestion> UserAreaAccidentFormQuestions { get; set; } = new List<UserAreaAccidentFormQuestion>();
}
