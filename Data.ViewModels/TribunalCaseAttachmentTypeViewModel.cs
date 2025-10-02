using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TribunalCaseAttachmentTypeViewModel
{
    [Key]
    public int TribunalCaseAttachmentTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
