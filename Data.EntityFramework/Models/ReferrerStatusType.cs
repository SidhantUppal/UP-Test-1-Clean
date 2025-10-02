using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ReferrerStatusType", Schema = "Referrer")]
public partial class ReferrerStatusType
{
    [Key]
    public int ReferrerStatusTypeID { get; set; }

    [StringLength(150)]
    public string Name { get; set; } = null!;

    [InverseProperty("ReferrerStatusType")]
    public virtual ICollection<ReferrerFriend> ReferrerFriends { get; set; } = new List<ReferrerFriend>();
}
