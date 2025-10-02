using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TextBlockCollectionEmployee", Schema = "V7")]
public partial class TextBlockCollectionEmployee
{
    [Key]
    public int TextBlockCollectionEmployeeID { get; set; }

    public int TextBlockCollectionID { get; set; }

    public int EmployeeID { get; set; }

    [ForeignKey("EmployeeID")]
    [InverseProperty("TextBlockCollectionEmployees")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("TextBlockCollectionID")]
    [InverseProperty("TextBlockCollectionEmployees")]
    public virtual TextBlockCollection TextBlockCollection { get; set; } = null!;
}
