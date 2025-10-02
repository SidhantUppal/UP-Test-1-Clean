using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class LegalRegisterLinkedRecordViewModel
{
    [Key]
    public int LegalRegisterLinkedRecordID { get; set; }

    public int LegalRegisterID { get; set; }

    [StringLength(100)]
    public string LinkedRecordType { get; set; } = null!;

    public int LinkedRecordID { get; set; }

    [StringLength(500)]
    public string LinkedRecordTitle { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
