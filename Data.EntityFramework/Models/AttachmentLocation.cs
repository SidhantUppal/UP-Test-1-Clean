using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AttachmentLocation", Schema = "V7")]
[Index("AttachmentID", "LocationID", Name = "CK_AttachmentLocation_Unique", IsUnique = true)]
[Index("LocationID", Name = "IX_AttachmentLocation_LocationID_includes")]
public partial class AttachmentLocation
{
    [Key]
    public int AttachmentLocationID { get; set; }

    public int AttachmentID { get; set; }

    public int LocationID { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("AttachmentLocations")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("LocationID")]
    [InverseProperty("AttachmentLocations")]
    public virtual Location Location { get; set; } = null!;
}
