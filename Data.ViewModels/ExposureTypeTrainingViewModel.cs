using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ExposureTypeTrainingViewModel
{
    [Key]
    public int ExposureTypeTrainingID { get; set; }

    public int ExposureTypeID { get; set; }

    public int? CourseID { get; set; }

    public int? ChecklistID { get; set; }

    public int? FrequencyTypeID { get; set; }

    public int? Frequency { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? DocumentID { get; set; }

    public int? DocumentLinkTableTypeID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
