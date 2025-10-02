using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocRegisterEmployeeViewModel
{
    [Key]
    public int DocRegisterEmployeeID { get; set; }

    public int UserAreaID { get; set; }

    public int DocumentLinkTableTypeID { get; set; }

    public int OriginalDocumentID { get; set; }

    public int EmployeeID { get; set; }

    public DateTimeOffset AssignmentDate { get; set; }

    // Additional Properties
}
