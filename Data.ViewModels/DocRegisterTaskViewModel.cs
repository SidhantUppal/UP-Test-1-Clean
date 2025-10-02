using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocRegisterTaskViewModel
{
    [Key]
    public int DocRegisterTaskID { get; set; }

    public int UserAreaID { get; set; }

    public int DocumentLinkTableTypeID { get; set; }

    public int OriginalDocumentID { get; set; }

    public int LatestDocumentID { get; set; }

    public int? TaskID { get; set; }

    public bool RequireReadAllAttachedForSigning { get; set; }

    public int? InductionEnrolmentID { get; set; }

    // Additional Properties
}
