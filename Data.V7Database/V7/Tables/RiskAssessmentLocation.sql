CREATE TABLE [V7].[RiskAssessmentLocation] (
    [RiskAssessmentLocationID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]               INT                NOT NULL,
    [RiskAssessmentID]         INT                NOT NULL,
    [LocationID]               INT                NOT NULL,
    [LocationSpecificNotes]    NVARCHAR (MAX)     NULL,
    [CreatedByUserID]          INT                NOT NULL,
    [CreatedDate]              DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentLocationID] ASC),
    CONSTRAINT [FK_RiskAssessmentLocation_Assessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentLocation_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_RiskAssessmentLocation_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [UQ_RiskAssessmentLocation] UNIQUE NONCLUSTERED ([RiskAssessmentID] ASC, [LocationID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessmentLocation_LocationID]
    ON [V7].[RiskAssessmentLocation]([LocationID] ASC);

