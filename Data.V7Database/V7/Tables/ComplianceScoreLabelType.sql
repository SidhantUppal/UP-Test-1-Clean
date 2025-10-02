CREATE TABLE [V7].[ComplianceScoreLabelType] (
    [ComplianceScoreLabelTypeID] INT          NOT NULL,
    [ComplianceScoreTypeID]      INT          NOT NULL,
    [UserAreaID]                 INT          NULL,
    [Score]                      INT          NOT NULL,
    [Colour]                     VARCHAR (10) NULL,
    [Title] NVARCHAR (100) NULL,
    CONSTRAINT [PK__Complian__6987215621383AA5] PRIMARY KEY CLUSTERED ([ComplianceScoreLabelTypeID] ASC),
    CONSTRAINT [FK_ComplianceScoreLabelType_ComplianceScoreType] FOREIGN KEY ([ComplianceScoreTypeID]) REFERENCES [V7].[ComplianceScoreType] ([ComplianceScoreTypeID]),
    CONSTRAINT [FK_ComplianceScoreLabelType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

