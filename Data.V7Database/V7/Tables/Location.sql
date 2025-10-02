CREATE TABLE [V7].[Location] (
    [LocationID]           INT                IDENTITY (1, 1) NOT NULL,
    [ParentID]             INT                NULL,
    [UserAreaID]           INT                NOT NULL,
    [Reference]            NVARCHAR (50)      NULL,
    [Title]                NVARCHAR (255)     NOT NULL,
    [UPRN]                 VARCHAR (12)       NULL,
    [IsMain]               BIT                DEFAULT ((1)) NOT NULL,
    [IsReportTopLevel]     BIT                DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([LocationID] ASC),
    CONSTRAINT [FK_Location_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Location_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Location_Location] FOREIGN KEY ([ParentID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_Location_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Location_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

