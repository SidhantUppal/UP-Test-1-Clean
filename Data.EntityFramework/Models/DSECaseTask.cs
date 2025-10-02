using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DSECaseTask", Schema = "V7")]
[Index("DSECaseID", Name = "IX_DSECaseTask_DSECaseID")]
[Index("DSECaseID", "TaskID", Name = "IX_DSECaseTask_DSECaseIDTaskID")]
public partial class DSECaseTask
{
    [Key]
    public int DSECaseTaskID { get; set; }

    public int? DSECaseID { get; set; }

    public int? TaskID { get; set; }

    public int? UserAreaID { get; set; }

    [ForeignKey("DSECaseID")]
    [InverseProperty("DSECaseTasks")]
    public virtual DSECase? DSECase { get; set; }

    [ForeignKey("TaskID")]
    [InverseProperty("DSECaseTasks")]
    public virtual BSSTask? Task { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("DSECaseTasks")]
    public virtual UserArea? UserArea { get; set; }
}
