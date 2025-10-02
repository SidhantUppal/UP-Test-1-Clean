using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("MobileSubmissionDataLog", Schema = "V7")]
public partial class MobileSubmissionDataLog
{
    [Key]
    public int MobileSubmissionDataLogID { get; set; }

    public int? UserAreaID { get; set; }

    public int? UserID { get; set; }

    public bool IsError { get; set; }

    [StringLength(128)]
    public string? UserName { get; set; }

    [StringLength(128)]
    public string? Module { get; set; }

    [StringLength(128)]
    public string? ViewModel { get; set; }

    [StringLength(512)]
    public string? CallStack { get; set; }

    public string? SyncData { get; set; }

    public string? ErrorMessage { get; set; }

    public DateTimeOffset SubmissionDate { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("MobileSubmissionDataLogs")]
    public virtual User? User { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("MobileSubmissionDataLogs")]
    public virtual UserArea? UserArea { get; set; }
}
