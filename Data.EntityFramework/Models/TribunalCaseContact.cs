using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TribunalCaseContact", Schema = "V7")]
public partial class TribunalCaseContact
{
    [Key]
    public int TribunalCaseContactID { get; set; }

    public int TribunalCaseID { get; set; }

    public int ContactID { get; set; }

    public int UserID { get; set; }

    public int UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TribunalCaseContactArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ContactID")]
    [InverseProperty("TribunalCaseContacts")]
    public virtual Contact Contact { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TribunalCaseContactCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TribunalCaseContactModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("TribunalCaseID")]
    [InverseProperty("TribunalCaseContacts")]
    public virtual TribunalCase TribunalCase { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("TribunalCaseContactUsers")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("TribunalCaseContacts")]
    public virtual UserArea UserArea { get; set; } = null!;
}
