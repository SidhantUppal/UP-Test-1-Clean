using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CopyUserAreaUser", Schema = "V7")]
public partial class CopyUserAreaUser
{
    [Key]
    public int CopyUserAreaUserID { get; set; }

    public int? CopiedUserAreaID { get; set; }

    public int? NewUserAreaID { get; set; }

    public int? CopiedUserID { get; set; }

    public int? NewUserID { get; set; }
}
