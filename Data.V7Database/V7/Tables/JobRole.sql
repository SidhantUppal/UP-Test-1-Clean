CREATE TABLE [V7].[JobRole] (
    [JobRoleID]            INT           IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT           NOT NULL,
    [Reference]            NVARCHAR (50) NULL,
    [CreatedByUserID]      INT           NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT           NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT           NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [Title] NVARCHAR (100) NULL,
    PRIMARY KEY CLUSTERED ([JobRoleID] ASC),
    CONSTRAINT [FK_JobRole_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_JobRole_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_JobRole_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_JobRole_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

