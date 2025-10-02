using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Lead", Schema = "V7")]
public partial class Lead
{
    [Key]
    public int LeadID { get; set; }

    [StringLength(100)]
    public string? FullName { get; set; }

    [StringLength(100)]
    public string? Email { get; set; }

    [StringLength(40)]
    public string? Phone { get; set; }

    [StringLength(100)]
    public string? CompanyName { get; set; }

    [StringLength(100)]
    public string? JobTitle { get; set; }

    [StringLength(1000)]
    public string? Comments { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string SessionID { get; set; } = null!;

    public DateTimeOffset DateTime { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("LeadArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("LeadCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("LeadModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
