using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ImportViewModel
{
    [Key]
    public int ImportID { get; set; }

    public int ImportRecordTypeID { get; set; }

    public int ImportStatusTypeID { get; set; }

    public int UserAreaID { get; set; }

    public string? OriginalData { get; set; }

    public string? PreImportData { get; set; }

    public string? PostImportData { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public byte? ImportProgress { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
