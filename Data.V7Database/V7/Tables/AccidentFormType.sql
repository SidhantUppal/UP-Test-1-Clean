CREATE TABLE [V7].[AccidentFormType] (
    [AccidentFormTypeID]              INT           IDENTITY (1, 1) NOT NULL,
    [Reference]                       NVARCHAR (20) NOT NULL,
    [IsSecondaryForm]                 BIT           CONSTRAINT [DF__AccidentF__IsSec__6D6238AF] DEFAULT ((0)) NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [ParentFormTypeID]                INT           NULL,
    [IsReportable]                    BIT           CONSTRAINT [DF__AccidentF__IsRep__07D7CE77] DEFAULT ((0)) NOT NULL,
    [LatestTemplateVersion]           TINYINT       CONSTRAINT [DF__AccidentF__Lates__20E37363] DEFAULT ((1)) NOT NULL,
    [UserAreaID]                      INT           NULL,
    [LiveTemplateVersion]             TINYINT       NULL,
    [IsNonAccidentForm]               BIT           CONSTRAINT [DF__AccidentF__IsNon__519197B6] DEFAULT ((0)) NOT NULL,
    [InvestigationAccidentFormTypeID] INT           NULL,
    [CreatedByUserID]          INT            NOT NULL,
    [CreatedDate]              DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]         INT            NULL,
    [ModifiedDate]         DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]         INT            NULL,
    [ArchivedDate]             DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__Accident__AB7BEBE3202395EE] PRIMARY KEY CLUSTERED ([AccidentFormTypeID] ASC),
    CONSTRAINT [FK_AccidentFormType_InvestigationForm] FOREIGN KEY ([InvestigationAccidentFormTypeID]) REFERENCES [V7].[AccidentFormType] ([AccidentFormTypeID]),
    CONSTRAINT [FK_AccidentFormType_ParentFormTypeID] FOREIGN KEY ([ParentFormTypeID]) REFERENCES [V7].[AccidentFormType] ([AccidentFormTypeID]),
    CONSTRAINT [FK_AccidentFormType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_AccidentFormType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentFormType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentFormType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


