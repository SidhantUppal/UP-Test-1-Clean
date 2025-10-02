using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentFormStatusType", Schema = "V7")]
public partial class AccidentFormStatusType
{
    [Key]
    public int AccidentFormStatusTypeID { get; set; }

    [StringLength(20)]
    public string Reference { get; set; } = null!;

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("AccidentFormStatusType")]
    public virtual ICollection<AccidentForm> AccidentForms { get; set; } = new List<AccidentForm>();
}
