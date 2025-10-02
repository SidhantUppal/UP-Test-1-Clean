using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaContact", Schema = "V7")]
[Index("UserAreaID", Name = "IX_UserAreaContact_UserAreaID_includes")]
public partial class UserAreaContact
{
    [Key]
    public int UserAreaContactID { get; set; }

    public int UserAreaID { get; set; }

    public int ContactID { get; set; }

    [ForeignKey("ContactID")]
    [InverseProperty("UserAreaContacts")]
    public virtual Contact Contact { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaContacts")]
    public virtual UserArea UserArea { get; set; } = null!;
}
