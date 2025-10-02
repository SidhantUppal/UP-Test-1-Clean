using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UpdateType", Schema = "V7")]
public partial class UpdateType
{
    [Key]
    public int UpdateTypeID { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    [InverseProperty("UpdateType")]
    public virtual ICollection<Update> Updates { get; set; } = new List<Update>();
}
