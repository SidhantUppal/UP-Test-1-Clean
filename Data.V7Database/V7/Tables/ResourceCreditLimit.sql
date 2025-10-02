CREATE TABLE [V7].[ResourceCreditLimit] (
    [ResourceCreditLimitID]   INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]              INT            NOT NULL,
    [DocumentLinkTableTypeID] INT            NOT NULL,
    [CreditLimit]             INT            NOT NULL,
    [Notes]                   NVARCHAR (MAX) NULL,
    [CreatedByUserID]         INT            NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]    INT            NULL,
    [ModifiedDate]        DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]        INT            NULL,
    [ArchivedDate]            DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([ResourceCreditLimitID] ASC),
    CONSTRAINT [FK_ResourceLimit_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ResourceLimit_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ResourceLimit_DocumentLinkTableType] FOREIGN KEY ([DocumentLinkTableTypeID]) REFERENCES [V7].[DocumentLinkTableType] ([DocumentLinkTableTypeID]),
    CONSTRAINT [FK_ResourceLimit_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ResourceLimit_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

