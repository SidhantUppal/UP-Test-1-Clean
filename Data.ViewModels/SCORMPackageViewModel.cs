using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SCORMPackageViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
