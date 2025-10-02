CREATE TABLE [V7].[SafeWorkingProcedure] (
    [SafeWorkingProcedureID]    INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                INT                NOT NULL,
    [SSOWDocumentTypeID]        INT                NOT NULL,
    [SSOWStatusTypeID]          INT                NOT NULL,
    [DocumentNumber]            NVARCHAR (50)      NOT NULL,
    [DocumentTitle]             NVARCHAR (255)     NOT NULL,
    [DocumentVersion]           NVARCHAR (20)      DEFAULT ('1.0') NULL,
    [PreviousVersionID]         INT                NULL,
    [IsCurrentVersion]          BIT                DEFAULT ((1)) NULL,
    [Purpose]                   NVARCHAR (MAX)     NOT NULL,
    [Scope]                     NVARCHAR (MAX)     NOT NULL,
    [Responsibilities]          NVARCHAR (MAX)     NULL,
    [SSOWRiskCategoryID]        INT                NULL,
    [HazardIdentification]      NVARCHAR (MAX)     NULL,
    [RiskAssessmentID]          INT                NULL,
    [RequiredPPE]               NVARCHAR (MAX)     NULL,
    [SafetyEquipment]           NVARCHAR (MAX)     NULL,
    [RequiredTraining]          NVARCHAR (MAX)     NULL,
    [CompetencyRequirements]    NVARCHAR (MAX)     NULL,
    [SupervisionRequirements]   NVARCHAR (500)     NULL,
    [EnvironmentalRequirements] NVARCHAR (MAX)     NULL,
    [WasteDisposal]             NVARCHAR (MAX)     NULL,
    [EmergencyProcedures]       NVARCHAR (MAX)     NULL,
    [EmergencyContacts]         NVARCHAR (MAX)     NULL,
    [FirstAidRequirements]      NVARCHAR (MAX)     NULL,
    [AuthorUserID]              INT                NOT NULL,
    [ReviewerUserID]            INT                NULL,
    [ApproverUserID]            INT                NULL,
    [ReviewDate]                DATETIMEOFFSET (7) NULL,
    [ApprovalDate]              DATETIMEOFFSET (7) NULL,
    [NextReviewDate]            DATETIMEOFFSET (7) NULL,
    [PublishedDate]             DATETIMEOFFSET (7) NULL,
    [PublishedByUserID]         INT                NULL,
    [EffectiveDate]             DATETIMEOFFSET (7) NULL,
    [ExpiryDate]                DATETIMEOFFSET (7) NULL,
    [LegalRequirements]         NVARCHAR (MAX)     NULL,
    [StandardsReferences]       NVARCHAR (MAX)     NULL,
    [RelatedDocuments]          NVARCHAR (MAX)     NULL,
    [IsActive]                  BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]           INT                NOT NULL,
    [CreatedDate]               DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]      INT                NULL,
    [ModifiedDate]          DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]          INT                NULL,
    [ArchivedDate]              DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([SafeWorkingProcedureID] ASC),
    CONSTRAINT [FK_SafeWorkingProcedure_Author] FOREIGN KEY ([AuthorUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SafeWorkingProcedure_DocumentType] FOREIGN KEY ([SSOWDocumentTypeID]) REFERENCES [V7].[SSOWDocumentType] ([SSOWDocumentTypeID]),
    CONSTRAINT [FK_SafeWorkingProcedure_PreviousVersion] FOREIGN KEY ([PreviousVersionID]) REFERENCES [V7].[SafeWorkingProcedure] ([SafeWorkingProcedureID]),
    CONSTRAINT [FK_SafeWorkingProcedure_RiskAssessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_SafeWorkingProcedure_RiskCategory] FOREIGN KEY ([SSOWRiskCategoryID]) REFERENCES [V7].[SSOWRiskCategory] ([SSOWRiskCategoryID]),
    CONSTRAINT [FK_SafeWorkingProcedure_Status] FOREIGN KEY ([SSOWStatusTypeID]) REFERENCES [V7].[SSOWStatusType] ([SSOWStatusTypeID]),
    CONSTRAINT [FK_SafeWorkingProcedure_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_SafeWorkingProcedure_DocumentNumber]
    ON [V7].[SafeWorkingProcedure]([DocumentNumber] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_SafeWorkingProcedure_Status]
    ON [V7].[SafeWorkingProcedure]([SSOWStatusTypeID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_SafeWorkingProcedure_UserAreaID]
    ON [V7].[SafeWorkingProcedure]([UserAreaID] ASC);

