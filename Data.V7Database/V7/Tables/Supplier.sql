CREATE TABLE [V7].[Supplier] (
    [SupplierID]           INT           IDENTITY (1, 1) NOT NULL,
    [Reference]            NVARCHAR (50) NULL,
    [UserAreaID]           INT           NOT NULL,
    [CreatedByUserID]      INT           NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT           NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT           NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [Title] NVARCHAR (100) NULL,
    [BasicDetails] NVARCHAR (MAX) NULL,
    [LocationDetails] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([SupplierID] ASC),
    CONSTRAINT [FK_Supplier_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Supplier_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Supplier_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Supplier_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

