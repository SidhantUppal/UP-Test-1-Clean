using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContactType", Schema = "V7")]
public partial class ContactType
{
    [Key]
    public int ContactTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string Name { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ContactTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("ContactType")]
    public virtual ICollection<ContactContactType> ContactContactTypes { get; set; } = new List<ContactContactType>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ContactTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ContactTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("ContactTypes")]
    public virtual UserArea? UserArea { get; set; }
}
