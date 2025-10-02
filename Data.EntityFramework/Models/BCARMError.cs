using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("BCARMError", Schema = "V7")]
public partial class BCARMError
{
    [Key]
    public int BCARMErrorID { get; set; }

    public int? BCARMUserInternalID { get; set; }

    public int? BCARMUserAreaInternalID { get; set; }

    [Unicode(false)]
    public string PersonalMessage { get; set; } = null!;

    [Unicode(false)]
    public string ExceptionType { get; set; } = null!;

    [Unicode(false)]
    public string ExceptionMessage { get; set; } = null!;

    [Unicode(false)]
    public string Exception { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("BCARMErrorArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("BCARMErrorCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("BCARMErrorModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
