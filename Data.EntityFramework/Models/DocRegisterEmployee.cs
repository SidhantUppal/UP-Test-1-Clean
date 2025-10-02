using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocRegisterEmployee", Schema = "V7")]
[Index("UserAreaID", "DocumentLinkTableTypeID", "OriginalDocumentID", Name = "IX_DocRegisterEmployee_Document_includes")]
[Index("UserAreaID", "DocumentLinkTableTypeID", "OriginalDocumentID", "EmployeeID", Name = "IX_DocRegisterEmployee_Employee_includes")]
public partial class DocRegisterEmployee
{
    [Key]
    public int DocRegisterEmployeeID { get; set; }

    public int UserAreaID { get; set; }

    public int DocumentLinkTableTypeID { get; set; }

    public int OriginalDocumentID { get; set; }

    public int EmployeeID { get; set; }

    public DateTimeOffset AssignmentDate { get; set; }

    [ForeignKey("DocumentLinkTableTypeID")]
    [InverseProperty("DocRegisterEmployees")]
    public virtual DocumentLinkTableType DocumentLinkTableType { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("DocRegisterEmployees")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("DocRegisterEmployees")]
    public virtual UserArea UserArea { get; set; } = null!;
}
