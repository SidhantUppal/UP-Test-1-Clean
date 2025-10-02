using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class EmployeeAttachmentViewModel
{
    [Key]
    public int EmployeeAttachmentID { get; set; }

    public int AttachmentID { get; set; }

    public int EmployeeID { get; set; }

    public int? CourseID { get; set; }

    public int? EmployeeFolderID { get; set; }

    public int? HRCaseAttachmentTypeID { get; set; }

    // Additional Properties
}
