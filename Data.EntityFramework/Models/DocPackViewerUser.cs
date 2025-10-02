using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocPackViewerUser", Schema = "V7")]
public partial class DocPackViewerUser
{
    [Key]
    public int DocPackViewerUserID { get; set; }

    public int DocPackID { get; set; }

    public int UserID { get; set; }

    public DateTimeOffset? ExpirationDate { get; set; }

    public int? CreatedByUserID { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    [ForeignKey("DocPackID")]
    [InverseProperty("DocPackViewerUsers")]
    public virtual DocPack DocPack { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("DocPackViewerUsers")]
    public virtual User User { get; set; } = null!;
}
