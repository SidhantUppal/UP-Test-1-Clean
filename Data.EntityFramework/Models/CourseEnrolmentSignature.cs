using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseEnrolmentSignature", Schema = "V7")]
public partial class CourseEnrolmentSignature
{
    [Key]
    public int CourseEnrolmentSignatureID { get; set; }

    public int UserAreaID { get; set; }

    public int CourseEnrolmentID { get; set; }

    [StringLength(50)]
    public string? SignatureType { get; set; }

    public string SignatureData { get; set; } = null!;

    public int SignedByUserID { get; set; }

    public DateTimeOffset SignedDate { get; set; }

    public string? AgreementText { get; set; }

    [StringLength(50)]
    public string? IPAddress { get; set; }

    [StringLength(500)]
    public string? UserAgent { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("CourseEnrolmentID")]
    [InverseProperty("CourseEnrolmentSignatures")]
    public virtual CourseEnrolment CourseEnrolment { get; set; } = null!;

    [ForeignKey("SignedByUserID")]
    [InverseProperty("CourseEnrolmentSignatures")]
    public virtual User SignedByUser { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("CourseEnrolmentSignatures")]
    public virtual UserArea UserArea { get; set; } = null!;
}
