using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HelpTextAttachment", Schema = "V7")]
public partial class HelpTextAttachment
{
    [Key]
    public int HelpTextAttachmentID { get; set; }

    public int HelpTextID { get; set; }

    public int AttachmentID { get; set; }
}
