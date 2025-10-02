CREATE TABLE [V7].[Policy] (
    [PolicyID]               INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]             INT                NOT NULL,
    [PolicyTypeID]           INT                NOT NULL,
    [PolicyCategoryID]       INT                NULL,
    [PolicyStatusTypeID]     INT                NOT NULL,
    [PolicyNumber]           NVARCHAR (50)      NOT NULL,
    [PolicyTitle]            NVARCHAR (255)     NOT NULL,
    [PolicyVersion]          NVARCHAR (20)      DEFAULT ('1.0') NULL,
    [PreviousVersionID]      INT                NULL,
    [IsCurrentVersion]       BIT                DEFAULT ((1)) NULL,
    [PolicySummary]          NVARCHAR (MAX)     NULL,
    [PolicyContent]          NVARCHAR (MAX)     NOT NULL,
    [Purpose]                NVARCHAR (MAX)     NULL,
    [Scope]                  NVARCHAR (MAX)     NULL,
    [Applicability]          NVARCHAR (MAX)     NULL,
    [RegulatoryRequirements] NVARCHAR (MAX)     NULL,
    [LegalReferences]        NVARCHAR (MAX)     NULL,
    [ComplianceNotes]        NVARCHAR (MAX)     NULL,
    [PolicyOwnerUserID]      INT                NOT NULL,
    [AuthorUserID]           INT                NOT NULL,
    [DepartmentResponsible]  NVARCHAR (255)     NULL,
    [ReviewerUserID]         INT                NULL,
    [ApproverUserID]         INT                NULL,
    [ReviewDate]             DATETIMEOFFSET (7) NULL,
    [ApprovalDate]           DATETIMEOFFSET (7) NULL,
    [NextReviewDate]         DATETIMEOFFSET (7) NULL,
    [ReviewFrequencyMonths]  INT                DEFAULT ((12)) NULL,
    [PublishedDate]          DATETIMEOFFSET (7) NULL,
    [PublishedByUserID]      INT                NULL,
    [EffectiveDate]          DATETIMEOFFSET (7) NULL,
    [ExpiryDate]             DATETIMEOFFSET (7) NULL,
    [RequiresTraining]       BIT                DEFAULT ((0)) NULL,
    [RequiresAcknowledgment] BIT                DEFAULT ((1)) NULL,
    [TrainingCourseID]       INT                NULL,
    [AcknowledgmentText]     NVARCHAR (MAX)     NULL,
    [RelatedPolicies]        NVARCHAR (MAX)     NULL,
    [Keywords]               NVARCHAR (500)     NULL,
    [AdditionalNotes]        NVARCHAR (MAX)     NULL,
    [IsActive]               BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]        INT                NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]   INT                NULL,
    [ModifiedDate]       DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]       INT                NULL,
    [ArchivedDate]           DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([PolicyID] ASC),
    CONSTRAINT [FK_Policy_Approver] FOREIGN KEY ([ApproverUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Policy_Author] FOREIGN KEY ([AuthorUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Policy_PolicyCategory] FOREIGN KEY ([PolicyCategoryID]) REFERENCES [V7].[PolicyCategory] ([PolicyCategoryID]),
    CONSTRAINT [FK_Policy_PolicyOwner] FOREIGN KEY ([PolicyOwnerUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Policy_PolicyStatus] FOREIGN KEY ([PolicyStatusTypeID]) REFERENCES [V7].[PolicyStatusType] ([PolicyStatusTypeID]),
    CONSTRAINT [FK_Policy_PolicyType] FOREIGN KEY ([PolicyTypeID]) REFERENCES [V7].[PolicyType] ([PolicyTypeID]),
    CONSTRAINT [FK_Policy_PreviousVersion] FOREIGN KEY ([PreviousVersionID]) REFERENCES [V7].[Policy] ([PolicyID]),
    CONSTRAINT [FK_Policy_Publisher] FOREIGN KEY ([PublishedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Policy_Reviewer] FOREIGN KEY ([ReviewerUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Policy_TrainingCourse] FOREIGN KEY ([TrainingCourseID]) REFERENCES [V7].[Course] ([CourseID]),
    CONSTRAINT [FK_Policy_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_Policy_EffectiveDate]
    ON [V7].[Policy]([EffectiveDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Policy_ExpiryDate]
    ON [V7].[Policy]([ExpiryDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Policy_NextReviewDate]
    ON [V7].[Policy]([NextReviewDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Policy_PolicyNumber]
    ON [V7].[Policy]([PolicyNumber] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Policy_PolicyOwner]
    ON [V7].[Policy]([PolicyOwnerUserID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Policy_Status]
    ON [V7].[Policy]([PolicyStatusTypeID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Policy_UserAreaID]
    ON [V7].[Policy]([UserAreaID] ASC);

