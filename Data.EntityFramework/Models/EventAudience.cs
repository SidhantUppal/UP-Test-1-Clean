using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EventAudience", Schema = "V7")]
public partial class EventAudience
{
    [Key]
    public int EventAudienceID { get; set; }

    public int EventID { get; set; }

    public int? UserAreaID { get; set; }

    public int? UserID { get; set; }

    [ForeignKey("EventID")]
    [InverseProperty("EventAudiences")]
    public virtual Event Event { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("EventAudiences")]
    public virtual User? User { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("EventAudiences")]
    public virtual UserArea? UserArea { get; set; }
}
