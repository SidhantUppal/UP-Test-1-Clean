using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseCertificate", Schema = "V7")]
public partial class CourseCertificate
{
    [Key]
    public int CourseCertificateID { get; set; }

    public int UserAreaID { get; set; }

    public int CourseEnrolmentID { get; set; }

    public int? CertificateTemplateID { get; set; }

    [StringLength(50)]
    public string CertificateNumber { get; set; } = null!;

    public DateTimeOffset IssuedDate { get; set; }

    public DateTimeOffset? ExpiryDate { get; set; }

    [StringLength(100)]
    public string? VerificationCode { get; set; }

    [StringLength(500)]
    public string? VerificationURL { get; set; }

    public string? CertificateData { get; set; }

    [StringLength(500)]
    public string? CertificateFileURL { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("CourseEnrolmentID")]
    [InverseProperty("CourseCertificates")]
    public virtual CourseEnrolment CourseEnrolment { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("CourseCertificates")]
    public virtual UserArea UserArea { get; set; } = null!;
}
