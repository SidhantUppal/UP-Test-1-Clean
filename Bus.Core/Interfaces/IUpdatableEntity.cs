namespace Bus.Core.Interfaces
{
    public interface IUpdatableEntity
    {
        int CreatedByUserID { get; set; }
        DateTime CreatedDate { get; set; }
        int? ModifiedByUserID { get; set; }
        DateTime? ModifiedDate { get; set; }
        int? ArchivedByUserID { get; set; }
        DateTime? ArchivedDate { get; set; }
    }
}
