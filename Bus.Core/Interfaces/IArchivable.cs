namespace Bus.Core.Interfaces
{
    public interface IArchivable
    {
        DateTime? ArchivedDate { get; }
        int? ArchivedByUserID { get; }

        void Archive(int userID);
        void UnArchive(int userID);
    }
}
