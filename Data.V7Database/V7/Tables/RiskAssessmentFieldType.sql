CREATE TABLE [V7].[RiskAssessmentFieldType] (
    [RiskAssessmentFieldTypeID]   INT          NOT NULL,
    [UserAreaID]         INT           NULL,
    [RiskAssessmentSectionTypeID] INT          NOT NULL,
    [Ident]                       INT          NOT NULL,
    [Type]                        VARCHAR (50) NOT NULL,
    [OrderNum]                    INT          NOT NULL,
    [IsRequired]                  BIT          CONSTRAINT [DF__RiskAsses__IsReq__03524525] DEFAULT ((0)) NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [Options] NVARCHAR (1000) NULL,
    [IsControlMeasure]            BIT          CONSTRAINT [DF_RiskAssessmentFieldType_IsControlMeasure] DEFAULT ((0)) NOT NULL,
    [HazardID]                    INT          NULL,
    [CreatedByUserID]          INT            NOT NULL,
    [CreatedDate]              DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]         INT            NULL,
    [ModifiedDate]         DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]         INT            NULL,
    [ArchivedDate]             DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__RiskAsse__757924B244C66B5E] PRIMARY KEY CLUSTERED ([RiskAssessmentFieldTypeID] ASC),
    CONSTRAINT [FK_RiskAssessmentFieldType_Hazard] FOREIGN KEY ([HazardID]) REFERENCES [V7].[Hazard] ([HazardID]),
    CONSTRAINT [FK_RiskAssessmentFieldType_RiskAssessmentSectionType] FOREIGN KEY ([RiskAssessmentSectionTypeID]) REFERENCES [V7].[RiskAssessmentSectionType] ([RiskAssessmentSectionTypeID]),
    CONSTRAINT [FK_RiskAssessmentFieldType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessmentFieldType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessmentFieldType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessmentFieldType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


