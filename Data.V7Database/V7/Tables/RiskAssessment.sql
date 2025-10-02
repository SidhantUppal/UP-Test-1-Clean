CREATE TABLE [V7].[RiskAssessment] (
    [RiskAssessmentID]           INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                 INT                NOT NULL,
    [RiskAssessmentTypeID]       INT                NULL,
    [RiskAssessmentFormatTypeID] INT                NULL,
    [RiskAssessmentStatusTypeID] INT                NOT NULL,
    [RiskMatrixTypeID]           INT                NULL,
    [AssessmentNumber]           NVARCHAR (50)      NOT NULL,
    [AssessmentTitle]            NVARCHAR (255)     NOT NULL,
    [AssessmentDescription]      NVARCHAR (MAX)     NULL,
    [Activity]                   NVARCHAR (500)     NULL,
    [Location]                   NVARCHAR (500)     NULL,
    [Equipment]                  NVARCHAR (500)     NULL,
    [AssessmentDate]             DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [AssessedByUserID]           INT                NOT NULL,
    [ReviewDate]                 DATETIMEOFFSET (7) NULL,
    [ReviewedByUserID]           INT                NULL,
    [NextReviewDate]             DATETIMEOFFSET (7) NULL,
    [OverallRiskScore]           INT                NULL,
    [ResidualRiskScore]          INT                NULL,
    [RiskRating]                 NVARCHAR (50)      NULL,
    [ApprovalRequired]           BIT                DEFAULT ((1)) NULL,
    [ApprovedDate]               DATETIMEOFFSET (7) NULL,
    [ApprovedByUserID]           INT                NULL,
    [ApprovalComments]           NVARCHAR (MAX)     NULL,
    [Version]                    NVARCHAR (20)      DEFAULT ('1.0') NULL,
    [PreviousVersionID]          INT                NULL,
    [IsCurrentVersion]           BIT                DEFAULT ((1)) NULL,
    [IsActive]                   BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]            INT                NOT NULL,
    [CreatedDate]                DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]       INT                NULL,
    [ModifiedDate]           DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]           INT                NULL,
    [ArchivedDate]               DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentID] ASC),
    CONSTRAINT [FK_RiskAssessment_ApprovedBy] FOREIGN KEY ([ApprovedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessment_AssessedBy] FOREIGN KEY ([AssessedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessment_Format] FOREIGN KEY ([RiskAssessmentFormatTypeID]) REFERENCES [V7].[RiskAssessmentFormatType] ([RiskAssessmentFormatTypeID]),
    CONSTRAINT [FK_RiskAssessment_Matrix] FOREIGN KEY ([RiskMatrixTypeID]) REFERENCES [V7].[RiskMatrixType] ([RiskMatrixTypeID]),
    CONSTRAINT [FK_RiskAssessment_PreviousVersion] FOREIGN KEY ([PreviousVersionID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessment_ReviewedBy] FOREIGN KEY ([ReviewedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessment_Status] FOREIGN KEY ([RiskAssessmentStatusTypeID]) REFERENCES [V7].[RiskAssessmentStatusType] ([RiskAssessmentStatusTypeID]),
    CONSTRAINT [FK_RiskAssessment_Type] FOREIGN KEY ([RiskAssessmentTypeID]) REFERENCES [V7].[RiskAssessmentType] ([RiskAssessmentTypeID]),
    CONSTRAINT [FK_RiskAssessment_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessment_AssessedBy]
    ON [V7].[RiskAssessment]([AssessedByUserID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessment_AssessmentDate]
    ON [V7].[RiskAssessment]([AssessmentDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessment_AssessmentNumber]
    ON [V7].[RiskAssessment]([AssessmentNumber] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessment_NextReviewDate]
    ON [V7].[RiskAssessment]([NextReviewDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessment_Status]
    ON [V7].[RiskAssessment]([RiskAssessmentStatusTypeID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessment_UserAreaID]
    ON [V7].[RiskAssessment]([UserAreaID] ASC);

