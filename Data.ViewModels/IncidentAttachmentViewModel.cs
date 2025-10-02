using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class IncidentAttachmentViewModel
{
    [Key]
    public int IncidentAttachmentID { get; set; }

    public int IncidentCaseID { get; set; }

    public int AttachmentID { get; set; }

    [StringLength(50)]
    public string? FormType { get; set; }

    public DateTime CreatedDate { get; set; }

    public int CreatedByUserID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
