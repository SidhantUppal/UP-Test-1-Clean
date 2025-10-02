using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("BCARMLog", Schema = "V7")]
public partial class BCARMLog
{
    [Key]
    public int BCARMLogID { get; set; }

    public string XmlRequest { get; set; } = null!;

    public DateTimeOffset DateTime { get; set; }

    [StringLength(40)]
    [Unicode(false)]
    public string? IPAddress { get; set; }
}
