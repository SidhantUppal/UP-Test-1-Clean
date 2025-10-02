CREATE TABLE [V7].[DataStructure] (
    [DataStructureID]      INT            IDENTITY (1, 1) NOT NULL,
    [DataStructureTypeID]  INT            NOT NULL,
    [DataStructureJSON]    NVARCHAR (MAX) NOT NULL,
    [DataStructureTitle]   NVARCHAR (256) NULL,
    [UserAreaID]           INT            NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]     INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [IsTemplate]           BIT            DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([DataStructureID] ASC),
    CONSTRAINT [FK_DataStructure_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DataStructure_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DataStructure_DataStructureCategory] FOREIGN KEY ([DataStructureTypeID]) REFERENCES [V7].[DataStructureType] ([DataStructureTypeID]),
    CONSTRAINT [FK_DataStructure_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DataStructure_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

