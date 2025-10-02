using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ChecklistContentViewModel
{
    [Key]
    public int ChecklistContentID { get; set; }

    public int ChecklistTemplateID { get; set; }

    public int Version { get; set; }

    public string ContentJSON { get; set; } = null!;

    public int? QuestionCount { get; set; }

    public int? MaxScore { get; set; }

    public bool? HasCriticalQuestions { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
}
