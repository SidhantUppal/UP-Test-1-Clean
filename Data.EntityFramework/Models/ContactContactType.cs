using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContactContactType", Schema = "V7")]
[Index("ContactID", "ContactTypeID", Name = "CK_ContactContactType_Unique", IsUnique = true)]
[Index("ContactTypeID", Name = "IX_ContactContactType_ContactTypeID_includes")]
public partial class ContactContactType
{
    [Key]
    public int ContactContactTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int ContactID { get; set; }

    public int ContactTypeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ContactContactTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ContactID")]
    [InverseProperty("ContactContactTypes")]
    public virtual Contact Contact { get; set; } = null!;

    [ForeignKey("ContactTypeID")]
    [InverseProperty("ContactContactTypes")]
    public virtual ContactType ContactType { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ContactContactTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ContactContactTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("ContactContactTypes")]
    public virtual UserArea? UserArea { get; set; }
}
