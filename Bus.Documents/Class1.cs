using Bus.Core;
using Data.EntityFramework;
using Data.EntityFramework.Models;
using Data.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Bus.Documents
{
    public class DocumentsBus : BusBase<V7DBContext>
    {
        public DocumentsBus(V7DBContext dbContext) : base(dbContext)
        {
        }

        #region Document CRUD Operations

        ///// <summary>
        ///// Gets all documents
        ///// </summary>
        //public async Task<List<DocumentViewModel>> GetAllDocumentsAsync()
        //{
        //    return await DBContext.Documents
        //        .Select(d => new DocumentViewModel
        //        {
        //            DocumentID = d.DocumentID,
        //            DocumentName = d.DocumentName,
        //            DocumentDescription = d.DocumentDescription,
        //            CreatedDate = d.CreatedDate,
        //            CreatedByUserID = d.CreatedByUserID
        //            // Map other properties as needed
        //        })
        //        .ToListAsync();
        //}

        ///// <summary>
        ///// Gets a document by ID
        ///// </summary>
        //public async Task<DocumentViewModel?> GetDocumentByIdAsync(int documentId)
        //{
        //    var document = await DBContext.Documents
        //        .FirstOrDefaultAsync(d => d.DocumentID == documentId);

        //    if (document == null) return null;

        //    return new DocumentViewModel
        //    {
        //        DocumentID = document.DocumentID,
        //        DocumentName = document.DocumentName,
        //        DocumentDescription = document.DocumentDescription,
        //        CreatedDate = document.CreatedDate,
        //        CreatedByUserID = document.CreatedByUserID
        //        // Map other properties as needed
        //    };
        //}

        ///// <summary>
        ///// Creates a new document
        ///// </summary>
        //public async Task<int> CreateDocumentAsync(DocumentViewModel documentViewModel, int? userID = null)
        //{
        //    var document = new Document
        //    {
        //        DocumentName = documentViewModel.DocumentName,
        //        DocumentDescription = documentViewModel.DocumentDescription
        //        // Map other properties as needed
        //    };

        //    // Set audit fields using BusBase method
        //    SetCreatedEntity(document, userID);

        //    DBContext.Documents.Add(document);
        //    await DBContext.SaveChangesAsync();

        //    return document.DocumentID;
        //}

        ///// <summary>
        ///// Updates an existing document
        ///// </summary>
        //public async Task<bool> UpdateDocumentAsync(DocumentViewModel documentViewModel, int? userID = null)
        //{
        //    var document = await DBContext.Documents
        //        .FirstOrDefaultAsync(d => d.DocumentID == documentViewModel.DocumentID);

        //    if (document == null) return false;

        //    document.DocumentName = documentViewModel.DocumentName;
        //    document.DocumentDescription = documentViewModel.DocumentDescription;
        //    // Update other properties as needed

        //    // Set modification audit fields using BusBase method
        //    SetModifiedEntity(document, userID);

        //    await DBContext.SaveChangesAsync();
        //    return true;
        //}

        ///// <summary>
        ///// Archives a document (soft delete)
        ///// </summary>
        //public async Task<bool> ArchiveDocumentAsync(int documentId, int? userID = null)
        //{
        //    var document = await DBContext.Documents
        //        .FirstOrDefaultAsync(d => d.DocumentID == documentId);

        //    if (document == null) return false;

        //    // Set archival audit fields using BusBase method
        //    SetArchivedEntity(document, userID);

        //    await DBContext.SaveChangesAsync();
        //    return true;
        //}

        ///// <summary>
        ///// Gets documents by user area
        ///// </summary>
        //public async Task<List<DocumentViewModel>> GetDocumentsByUserAreaAsync(int userAreaId)
        //{
        //    return await DBContext.Documents
        //        .Where(d => d.UserAreaID == userAreaId && d.ArchivedDate == null)
        //        .Select(d => new DocumentViewModel
        //        {
        //            DocumentID = d.DocumentID,
        //            DocumentName = d.DocumentName,
        //            DocumentDescription = d.DocumentDescription,
        //            CreatedDate = d.CreatedDate,
        //            CreatedByUserID = d.CreatedByUserID
        //            // Map other properties as needed
        //        })
        //        .ToListAsync();
        //}

        #endregion
    }
}
