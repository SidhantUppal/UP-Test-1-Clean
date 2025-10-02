using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionStaticDataItemViewModel
{
    [Key]
    public int QuestionStaticDataItemID { get; set; }

    public int QuestionID { get; set; }

    public int QuestionnaireStaticDataTypeID { get; set; }

    public int StaticDataRecordID { get; set; }

    // Additional Properties
}
