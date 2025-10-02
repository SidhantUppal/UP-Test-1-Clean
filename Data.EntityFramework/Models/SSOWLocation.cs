using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SSOWLocation", Schema = "V7")]
public partial class SSOWLocation
{
    [Key]
    public int SSOWLocationID { get; set; }

    public int UserAreaID { get; set; }

    public int LocationID { get; set; }

    [StringLength(50)]
    public string DocumentType { get; set; } = null!;

    public int DocumentID { get; set; }

    public string? LocationSpecificNotes { get; set; }

    public string? LocalVariations { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("SSOWLocations")]
    public virtual Location Location { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("SSOWLocations")]
    public virtual UserArea UserArea { get; set; } = null!;
}
