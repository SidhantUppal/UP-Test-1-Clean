using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentPersonType", Schema = "V7")]
public partial class AccidentPersonType
{
    [Key]
    public int AccidentPersonTypeID { get; set; }

    [StringLength(20)]
    public string Reference { get; set; } = null!;

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("AccidentPersonType")]
    public virtual ICollection<AccidentCasePersonDatum> AccidentCasePersonData { get; set; } = new List<AccidentCasePersonDatum>();

    [InverseProperty("AccidentPersonType")]
    public virtual ICollection<AccidentPerson> AccidentPeople { get; set; } = new List<AccidentPerson>();
}
