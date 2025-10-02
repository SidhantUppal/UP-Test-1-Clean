CREATE TABLE [V7].[DocumentRegisterDocument] (
    [DocumentRegisterDocumentID] INT            IDENTITY (1, 1) NOT NULL,
    [DocumentRegisterID]         INT            NOT NULL,
    [DocumentID]                 INT            NOT NULL,
    [Version]                    DECIMAL (4, 1) NOT NULL,
    PRIMARY KEY CLUSTERED ([DocumentRegisterDocumentID] ASC),
    CONSTRAINT [FK_DocumentRegisterDocument_DocumentRegister] FOREIGN KEY ([DocumentRegisterID]) REFERENCES [V7].[DocumentRegister] ([DocumentRegisterID]),
    CONSTRAINT [CK_DocumentRegisterDocument_Unique] UNIQUE NONCLUSTERED ([DocumentRegisterID] ASC, [DocumentID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentRegisterDocument_DocumentID_includes]
    ON [V7].[DocumentRegisterDocument]([DocumentID] ASC)
    INCLUDE([DocumentRegisterDocumentID], [DocumentRegisterID]);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentRegisterDocument_DocumentRegisterID_includes]
    ON [V7].[DocumentRegisterDocument]([DocumentRegisterID] ASC)
    INCLUDE([DocumentRegisterDocumentID], [DocumentID]);

