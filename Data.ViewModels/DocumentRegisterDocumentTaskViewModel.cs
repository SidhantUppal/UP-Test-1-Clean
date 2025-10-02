using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentRegisterDocumentTaskViewModel
{
    [Key]
    public int DocumentRegisterDocumentTaskID { get; set; }

    public int DocumentRegisterDocumentID { get; set; }

    public int TaskID { get; set; }

    // Additional Properties
}
