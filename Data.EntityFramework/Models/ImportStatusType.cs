using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ImportStatusType", Schema = "V7")]
public partial class ImportStatusType
{
    [Key]
    public int ImportStatusTypeID { get; set; }

    [StringLength(50)]
    public string Title { get; set; } = null!;

    [InverseProperty("ImportStatusType")]
    public virtual ICollection<Import> Imports { get; set; } = new List<Import>();
}
