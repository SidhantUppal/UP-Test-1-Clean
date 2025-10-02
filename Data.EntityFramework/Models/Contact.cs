using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Contact", Schema = "V7")]
public partial class Contact
{
    [Key]
    public int ContactID { get; set; }

    public int? EmployeeID { get; set; }

    public int UserAreaID { get; set; }

    public int? PersonTitleTypeID { get; set; }

    public int? ContactTypeID { get; set; }

    [StringLength(255)]
    public string Name { get; set; } = null!;

    [StringLength(255)]
    public string? Email { get; set; }

    public int? HomeAddressID { get; set; }

    [StringLength(255)]
    public string? Telephone { get; set; }

    [StringLength(255)]
    public string? Mobile { get; set; }

    [StringLength(255)]
    public string? LinkedInURL { get; set; }

    [StringLength(255)]
    public string? Relationship { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [StringLength(255)]
    public string? Telephone2 { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ContactArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("Contact")]
    public virtual ICollection<ContactAttachment> ContactAttachments { get; set; } = new List<ContactAttachment>();

    [InverseProperty("Contact")]
    public virtual ICollection<ContactContactType> ContactContactTypes { get; set; } = new List<ContactContactType>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ContactCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("Contacts")]
    public virtual Employee? Employee { get; set; }

    [ForeignKey("HomeAddressID")]
    [InverseProperty("Contacts")]
    public virtual Address? HomeAddress { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ContactModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("PersonTitleTypeID")]
    [InverseProperty("Contacts")]
    public virtual PersonTitleType? PersonTitleType { get; set; }

    [InverseProperty("Contact")]
    public virtual ICollection<RecruitmentVacancyApplicant> RecruitmentVacancyApplicants { get; set; } = new List<RecruitmentVacancyApplicant>();

    [InverseProperty("Contact")]
    public virtual ICollection<RecruitmentVacancyAttachment> RecruitmentVacancyAttachments { get; set; } = new List<RecruitmentVacancyAttachment>();

    [InverseProperty("Contact")]
    public virtual ICollection<TribunalCaseContact> TribunalCaseContacts { get; set; } = new List<TribunalCaseContact>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("Contacts")]
    public virtual UserArea UserArea { get; set; } = null!;

    [InverseProperty("Contact")]
    public virtual ICollection<UserAreaContact> UserAreaContacts { get; set; } = new List<UserAreaContact>();
}
