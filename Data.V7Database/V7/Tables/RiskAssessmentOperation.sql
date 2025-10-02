CREATE TABLE [V7].[RiskAssessmentOperation] (
    [RiskAssessmentOperationID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                INT                NOT NULL,
    [RiskAssessmentID]          INT                NOT NULL,
    [OperationName]             NVARCHAR (255)     NOT NULL,
    [OperationDescription]      NVARCHAR (MAX)     NULL,
    [OperationSequence]         INT                DEFAULT ((0)) NULL,
    [CreatedByUserID]           INT                NOT NULL,
    [CreatedDate]               DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]      INT                NULL,
    [ModifiedDate]          DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]          INT                NULL,
    [ArchivedDate]              DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentOperationID] ASC),
    CONSTRAINT [FK_RiskAssessmentOperation_Assessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentOperation_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

