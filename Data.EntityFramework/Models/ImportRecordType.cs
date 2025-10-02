using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ImportRecordType", Schema = "V7")]
public partial class ImportRecordType
{
    [Key]
    public int ImportRecordTypeID { get; set; }

    [StringLength(50)]
    public string Title { get; set; } = null!;

    [InverseProperty("ImportRecordType")]
    public virtual ICollection<Import> Imports { get; set; } = new List<Import>();
}
