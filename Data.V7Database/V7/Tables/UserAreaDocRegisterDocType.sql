CREATE TABLE [V7].[UserAreaDocRegisterDocType] (
    [UserAreaDocRegisterDocTypeID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                   INT NOT NULL,
    [DocRegisterDocTypeID]         INT NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaDocRegisterDocTypeID] ASC),
    CONSTRAINT [FK_UserAreaDocRegisterDocType_DocRegisterDocType] FOREIGN KEY ([DocRegisterDocTypeID]) REFERENCES [V7].[DocRegisterDocType] ([DocRegisterDocTypeID]),
    CONSTRAINT [FK_UserAreaDocRegisterDocType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_UserAreaDocRegisterDocType_UserAreaID_includes]
    ON [V7].[UserAreaDocRegisterDocType]([UserAreaID] ASC)
    INCLUDE([UserAreaDocRegisterDocTypeID], [DocRegisterDocTypeID]);

