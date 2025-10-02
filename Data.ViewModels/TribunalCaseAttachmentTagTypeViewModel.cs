using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TribunalCaseAttachmentTagTypeViewModel
{
    [Key]
    public int TribunalCaseAttachmentTagTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int TribunalCaseAttachmentID { get; set; }

    public int TagTypeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
