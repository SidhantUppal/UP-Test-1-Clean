using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AccidentCaseUserAreaQuestionTypeDatumViewModel
{
    [Key]
    public int AccidentCaseUserAreaQuestionTypeDataID { get; set; }

    public int AccidentCaseID { get; set; }

    public int UserAreaQuestionTypeID { get; set; }

    [StringLength(250)]
    public string UserAreaQuestionTypeVALUE { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
