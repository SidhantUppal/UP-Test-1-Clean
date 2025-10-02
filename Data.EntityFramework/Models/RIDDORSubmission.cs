using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RIDDORSubmission", Schema = "V7")]
public partial class RIDDORSubmission
{
    [Key]
    public int RIDDORSubmissionID { get; set; }

    public int UserAreaID { get; set; }

    public int AccidentCaseID { get; set; }

    [Column(TypeName = "xml")]
    public string XMLContent { get; set; } = null!;

    public DateTimeOffset SubmissionDate { get; set; }

    [StringLength(255)]
    public string EmailTo { get; set; } = null!;

    [StringLength(255)]
    public string EmailFrom { get; set; } = null!;

    public bool? IsValid { get; set; }

    [StringLength(255)]
    public string? Note { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [StringLength(30)]
    [Unicode(false)]
    public string Reference { get; set; } = null!;

    [ForeignKey("AccidentCaseID")]
    [InverseProperty("RIDDORSubmissions")]
    public virtual AccidentCase AccidentCase { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("RIDDORSubmissionArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("RIDDORSubmissionCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("RIDDORSubmissionModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("RIDDORSubmissions")]
    public virtual UserArea UserArea { get; set; } = null!;
}
