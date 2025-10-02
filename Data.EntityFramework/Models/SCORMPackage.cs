using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SCORMPackage", Schema = "V7")]
public partial class SCORMPackage
{
    [Key]
    public int SCORMPackageID { get; set; }

    public Guid GUID { get; set; }

    [StringLength(150)]
    public string Name { get; set; } = null!;

    public byte Version { get; set; }

    public bool IsLive { get; set; }

    public string? Data { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? OriginalSCORMPackageID { get; set; }

    [StringLength(150)]
    public string? StartupRelativePath { get; set; }

    public bool HasPracticeQuestions { get; set; }

    public byte? PassPercentage { get; set; }

    public byte TotalExamQuestions { get; set; }

    [StringLength(50)]
    public string? ExamQuestionIdentifier { get; set; }

    public bool CheckForCompletionOnExitOnly { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("SCORMPackageArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("SCORMPackageCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("OriginalSCORMPackage")]
    public virtual ICollection<SCORMPackage> InverseOriginalSCORMPackage { get; set; } = new List<SCORMPackage>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("SCORMPackageModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OriginalSCORMPackageID")]
    [InverseProperty("InverseOriginalSCORMPackage")]
    public virtual SCORMPackage? OriginalSCORMPackage { get; set; }

    [InverseProperty("SCORMPackage")]
    public virtual ICollection<SCORMPackageUserArea> SCORMPackageUserAreas { get; set; } = new List<SCORMPackageUserArea>();
}
