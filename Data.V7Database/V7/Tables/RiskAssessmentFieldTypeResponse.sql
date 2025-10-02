CREATE TABLE [V7].[RiskAssessmentFieldTypeResponse] (
    [RiskAssessmentFieldTypeResponseID] INT            IDENTITY (1, 1) NOT NULL,
    [RiskAssessmentID]                  INT            NOT NULL,
    [RiskAssessmentFieldTypeID]         INT            NOT NULL,
    [UserAreaID]                        INT            NOT NULL,
    [Response]                          NVARCHAR (MAX) NOT NULL,
    [CustomTitle]                       NVARCHAR (400) NULL,
    CONSTRAINT [PK__RiskAsse__23F3593B7AC7F6C0] PRIMARY KEY CLUSTERED ([RiskAssessmentFieldTypeResponseID] ASC),
    CONSTRAINT [FK_RiskAssessmentFieldTypeResponse_RiskAssessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentFieldTypeResponse_RiskAssessmentFieldType] FOREIGN KEY ([RiskAssessmentFieldTypeID]) REFERENCES [V7].[RiskAssessmentFieldType] ([RiskAssessmentFieldTypeID]),
    CONSTRAINT [FK_RiskAssessmentFieldTypeResponse_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessmentFieldTypeResponse_RiskAssessmentID_RiskAssessmentFieldTypeID_UserAreaID_includes]
    ON [V7].[RiskAssessmentFieldTypeResponse]([RiskAssessmentID] ASC, [RiskAssessmentFieldTypeID] ASC, [UserAreaID] ASC)
    INCLUDE([RiskAssessmentFieldTypeResponseID], [Response], [CustomTitle]);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessmentFieldTypeResponse_RiskAssessmentID_UserAreaID]
    ON [V7].[RiskAssessmentFieldTypeResponse]([RiskAssessmentID] ASC, [UserAreaID] ASC);


GO
ALTER INDEX [IX_RiskAssessmentFieldTypeResponse_RiskAssessmentID_UserAreaID]
    ON [V7].[RiskAssessmentFieldTypeResponse] DISABLE;

