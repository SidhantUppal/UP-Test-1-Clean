using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AccidentCaseExportViewModel
{
    [Key]
    public int AccidentCaseExportID { get; set; }

    public int AccidentCaseID { get; set; }

    public int UserAreaID { get; set; }

    public byte[] ExportData { get; set; } = null!;

    public string? EmailedTo { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
