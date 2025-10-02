using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentCaseAssociation", Schema = "V7")]
public partial class AccidentCaseAssociation
{
    [Key]
    public int AccidentCaseAssociationID { get; set; }

    public int MasterAccidentCaseID { get; set; }

    public int AssociatedAccidentCaseID { get; set; }

    public string? Comment { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AccidentCaseAssociationArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AssociatedAccidentCaseID")]
    [InverseProperty("AccidentCaseAssociationAssociatedAccidentCases")]
    public virtual AccidentCase AssociatedAccidentCase { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AccidentCaseAssociationCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("MasterAccidentCaseID")]
    [InverseProperty("AccidentCaseAssociationMasterAccidentCases")]
    public virtual AccidentCase MasterAccidentCase { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AccidentCaseAssociationModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
