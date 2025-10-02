using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UnarchiveLog", Schema = "V7")]
public partial class UnarchiveLog
{
    [Key]
    public int UnarchiveLogID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    public DateTimeOffset DateTime { get; set; }

    [Column(TypeName = "xml")]
    public string Items { get; set; } = null!;

    [StringLength(255)]
    public string Comments { get; set; } = null!;
}
