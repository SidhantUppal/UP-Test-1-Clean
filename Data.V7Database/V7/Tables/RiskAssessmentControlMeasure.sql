CREATE TABLE [V7].[RiskAssessmentControlMeasure] (
    [RiskAssessmentControlMeasureID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                     INT                NOT NULL,
    [RiskAssessmentID]               INT                NOT NULL,
    [RiskAssessmentHazardID]         INT                NULL,
    [ControlMeasureID]               INT                NULL,
    [CustomControlName]              NVARCHAR (255)     NULL,
    [CustomControlDescription]       NVARCHAR (MAX)     NULL,
    [ImplementationStatus]           NVARCHAR (50)      DEFAULT ('Planned') NULL,
    [ImplementationDate]             DATETIMEOFFSET (7) NULL,
    [ResponsiblePersonID]            INT                NULL,
    [EffectivenessRating]            DECIMAL (3, 1)     NULL,
    [MonitoringRequired]             BIT                DEFAULT ((0)) NULL,
    [MonitoringFrequency]            NVARCHAR (100)     NULL,
    [ControlNotes]                   NVARCHAR (MAX)     NULL,
    [Cost]                           DECIMAL (10, 2)    NULL,
    [SequenceOrder]                  INT                DEFAULT ((0)) NULL,
    [CreatedByUserID]                INT                NOT NULL,
    [CreatedDate]                    DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]           INT                NULL,
    [ModifiedDate]               DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]               INT                NULL,
    [ArchivedDate]                   DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentControlMeasureID] ASC),
    CONSTRAINT [FK_RiskAssessmentControlMeasure_Assessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentControlMeasure_Control] FOREIGN KEY ([ControlMeasureID]) REFERENCES [V7].[ControlMeasure] ([ControlMeasureID]),
    CONSTRAINT [FK_RiskAssessmentControlMeasure_Hazard] FOREIGN KEY ([RiskAssessmentHazardID]) REFERENCES [V7].[RiskAssessmentHazard] ([RiskAssessmentHazardID]),
    CONSTRAINT [FK_RiskAssessmentControlMeasure_ResponsiblePerson] FOREIGN KEY ([ResponsiblePersonID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessmentControlMeasure_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessmentControlMeasure_AssessmentID]
    ON [V7].[RiskAssessmentControlMeasure]([RiskAssessmentID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessmentControlMeasure_HazardID]
    ON [V7].[RiskAssessmentControlMeasure]([RiskAssessmentHazardID] ASC);

