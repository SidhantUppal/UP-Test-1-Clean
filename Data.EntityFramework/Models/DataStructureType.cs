using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DataStructureType", Schema = "V7")]
public partial class DataStructureType
{
    [Key]
    public int DataStructureTypeID { get; set; }

    [StringLength(100)]
    public string Title { get; set; } = null!;

    [InverseProperty("DataStructureType")]
    public virtual ICollection<DataStructure> DataStructures { get; set; } = new List<DataStructure>();
}
