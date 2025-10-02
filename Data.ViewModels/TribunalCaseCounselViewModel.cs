using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TribunalCaseCounselViewModel
{
    [Key]
    public int TribunalCaseCounselID { get; set; }

    public int TribunalCaseID { get; set; }

    public int CounselID { get; set; }

    public DateTimeOffset? AssignedToCaseDate { get; set; }

    public bool HasAccessToCase { get; set; }

    public int? UserAreaID { get; set; }

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
