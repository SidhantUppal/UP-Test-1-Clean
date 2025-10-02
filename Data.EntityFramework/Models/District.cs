using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("District", Schema = "V7")]
public partial class District
{
    [Key]
    public int DistrictID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(512)]
    public string Name { get; set; } = null!;
}
