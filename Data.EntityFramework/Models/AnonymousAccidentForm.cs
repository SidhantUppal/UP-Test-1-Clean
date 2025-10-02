using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AnonymousAccidentForm", Schema = "V7")]
public partial class AnonymousAccidentForm
{
    [Key]
    public int AnonymousAccidentFormID { get; set; }

    public int UserAreaID { get; set; }

    public int AccidentFormTypeID { get; set; }

    public DateTimeOffset IncidentDate { get; set; }

    [StringLength(15)]
    public string? IncidentTime { get; set; }

    [StringLength(250)]
    public string? AdditionalReference { get; set; }

    public byte TemplateVersion { get; set; }

    [Column(TypeName = "xml")]
    public string? XMLResponse { get; set; }

    public bool IsSpam { get; set; }

    [StringLength(100)]
    public string SubmittedByName { get; set; } = null!;

    public DateTimeOffset SubmittedDate { get; set; }

    public int? ProcessedByUserID { get; set; }

    public DateTimeOffset? ProcessedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AccidentFormTypeID")]
    [InverseProperty("AnonymousAccidentForms")]
    public virtual AccidentFormType AccidentFormType { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AnonymousAccidentFormArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ProcessedByUserID")]
    [InverseProperty("AnonymousAccidentFormProcessedByUsers")]
    public virtual User? ProcessedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("AnonymousAccidentForms")]
    public virtual UserArea UserArea { get; set; } = null!;
}
