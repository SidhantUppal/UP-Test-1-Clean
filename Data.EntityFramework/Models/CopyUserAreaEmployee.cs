using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CopyUserAreaEmployee", Schema = "V7")]
public partial class CopyUserAreaEmployee
{
    [Key]
    public int CopyUserAreaEmployeeID { get; set; }

    public int? CopiedUserAreaID { get; set; }

    public int? NewUserAreaID { get; set; }

    public int? CopiedEmployeeID { get; set; }

    public int? NewEmployeeID { get; set; }

    public int? CopiedUserID { get; set; }
}
