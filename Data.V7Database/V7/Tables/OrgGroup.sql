CREATE TABLE [V7].[OrgGroup] (
    [OrgGroupID]                 INT                IDENTITY (1, 1) NOT NULL,
    [ParentID]                   INT                NULL,
    [UserAreaID]                 INT                NOT NULL,
    [Reference]                  NVARCHAR (50)      NULL,
    [Title]                      NVARCHAR (255)     NOT NULL,
    [IsMain]                     BIT                DEFAULT ((1)) NOT NULL,
    [ExcludeFromReportingCentre] BIT                DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]            INT                NOT NULL,
    [CreatedDate]                DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]       INT                NULL,
    [ModifiedDate]           DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]           INT                NULL,
    [ArchivedDate]               DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([OrgGroupID] ASC),
    CONSTRAINT [FK_OrgGroup_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_OrgGroup_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_OrgGroup_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_OrgGroup_OrgGroup] FOREIGN KEY ([ParentID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_OrgGroup_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

