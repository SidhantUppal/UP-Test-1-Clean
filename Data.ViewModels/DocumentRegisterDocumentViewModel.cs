using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentRegisterDocumentViewModel
{
    [Key]
    public int DocumentRegisterDocumentID { get; set; }

    public int DocumentRegisterID { get; set; }

    public int DocumentID { get; set; }

    public decimal Version { get; set; }

    // Additional Properties
}
