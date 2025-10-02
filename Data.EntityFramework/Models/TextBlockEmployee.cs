using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TextBlockEmployee", Schema = "V7")]
public partial class TextBlockEmployee
{
    [Key]
    public int TextBlockEmployeeID { get; set; }

    public int TextBlockID { get; set; }

    public int EmployeeID { get; set; }

    public DateTimeOffset? IssueDate { get; set; }

    [ForeignKey("EmployeeID")]
    [InverseProperty("TextBlockEmployees")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("TextBlockID")]
    [InverseProperty("TextBlockEmployees")]
    public virtual TextBlock TextBlock { get; set; } = null!;
}
