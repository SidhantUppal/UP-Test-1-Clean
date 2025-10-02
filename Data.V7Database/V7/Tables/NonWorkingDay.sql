CREATE TABLE [V7].[NonWorkingDay] (
    [NonWorkingDayID]      INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT            NOT NULL,
    [OrgGroupID]           INT            NULL,
    [NonWorkingType]       INT            NOT NULL,
    [Date]                 DATE           NOT NULL,
    [Reason]               NVARCHAR (256) NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([NonWorkingDayID] ASC),
    CONSTRAINT [FK_NonWorkingDay_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_NonWorkingDay_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_NonWorkingDay_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_NonWorkingDay_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_NonWorkingDay_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

