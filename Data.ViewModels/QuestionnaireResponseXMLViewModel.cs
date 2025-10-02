using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionnaireResponseXMLViewModel
{
    [Key]
    public int QuestionnaireResponseXMLID { get; set; }

    public int QuestionnaireResponseID { get; set; }

    public int V5ChecklistCacheID { get; set; }

    public int V5ChecklistResponseID { get; set; }

    public int? V5ParentChecklistResponseID { get; set; }

    public bool IsLatest { get; set; }

    public decimal Version { get; set; }

    public string XMLResponse { get; set; } = null!;

    // Additional Properties
}
