CREATE TABLE [V7].[SafeSystemOfWorkLink] (
    [SafeSystemOfWorkLinkID]  INT      IDENTITY (1, 1) NOT NULL,
    [SafeSystemOfWorkID]      INT      NOT NULL,
    [DocumentLinkTableTypeID] INT      NULL,
    [RecordID]                INT      NULL,
    [YesNoNAValue]            BIT      NULL,
    [CompletedDate]           DATETIMEOFFSET (7) NULL,
    [Comments] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([SafeSystemOfWorkLinkID] ASC),
    CONSTRAINT [FK_SafeSystemOfWorkLink_DocumentLinkTableType] FOREIGN KEY ([DocumentLinkTableTypeID]) REFERENCES [V7].[DocumentLinkTableType] ([DocumentLinkTableTypeID]),
    CONSTRAINT [FK_SafeSystemOfWorkLink_SafeSystemOfWork] FOREIGN KEY ([SafeSystemOfWorkID]) REFERENCES [V7].[SafeSystemOfWork] ([SafeSystemOfWorkID])
);

