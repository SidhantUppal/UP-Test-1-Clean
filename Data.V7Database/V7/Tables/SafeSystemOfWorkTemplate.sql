CREATE TABLE [V7].[SafeSystemOfWorkTemplate] (
    [SafeSystemOfWorkTemplateID]   INT           IDENTITY (1, 1) NOT NULL,
    [SafeSystemOfWorkTypeID]       INT           NOT NULL,
    [Reference]                    NVARCHAR (20) NULL,
    [UserAreaID]                   INT           NULL,
    [CreatedByUserID]              INT           NOT NULL,
    [CreatedDate]                  DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]         INT           NULL,
    [ArchivedByUserID]             INT           NULL,
    [IncludePPEOptions]            BIT           DEFAULT ((1)) NOT NULL,
    [IncludeRiskAssessmentOptions] BIT           DEFAULT ((1)) NOT NULL,
    [IncludeSSOWLinks]             BIT           DEFAULT ((1)) NOT NULL,
    [IncludeAdvancedDetails]       BIT           DEFAULT ((1)) NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [ModifiedDate] DATETIMEOFFSET (7) NULL,
    [ArchivedDate] DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([SafeSystemOfWorkTemplateID] ASC),
    CONSTRAINT [FK_SafeSystemOfWorkTemplate_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SafeSystemOfWorkTemplate_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SafeSystemOfWorkTemplate_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SafeSystemOfWorkTemplate_SafeSystemOfWorkType] FOREIGN KEY ([SafeSystemOfWorkTypeID]) REFERENCES [V7].[SafeSystemOfWorkType] ([SafeSystemOfWorkTypeID]),
    CONSTRAINT [FK_SafeSystemOfWorkTemplate_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

