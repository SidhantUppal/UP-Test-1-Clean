using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CaseEmailNotification", Schema = "V7")]
public partial class CaseEmailNotification
{
    [Key]
    public int CaseEmailNotificationID { get; set; }

    public int CaseID { get; set; }

    [StringLength(255)]
    public string EmailTo { get; set; } = null!;

    [StringLength(255)]
    public string EmailSubject { get; set; } = null!;

    public string EmailBody { get; set; } = null!;

    public bool IsSent { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public DateTimeOffset? ProcessedDate { get; set; }

    [ForeignKey("CaseID")]
    [InverseProperty("CaseEmailNotifications")]
    public virtual Case Case { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CaseEmailNotifications")]
    public virtual User CreatedByUser { get; set; } = null!;
}
