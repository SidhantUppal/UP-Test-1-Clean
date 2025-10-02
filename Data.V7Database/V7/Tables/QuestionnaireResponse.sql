CREATE TABLE [V7].[QuestionnaireResponse] (
    [QuestionnaireResponseID]         INT            IDENTITY (1, 1) NOT NULL,
    [OriginalQuestionnaireResponseID] INT            NULL,
    [QuestionnaireID]                 INT            NOT NULL,
    [IsFinished]                      BIT            CONSTRAINT [DF__Questionn__IsFin__7D98A078] DEFAULT ((0)) NOT NULL,
    [Reference]                       NVARCHAR (100) NULL,
    [CurrentQuestionnaireSectionID]   INT            NULL,
    [TotalScore]                      INT            NULL,
    [MaxScore]                        INT            NULL,
    [CourseEnrollmentID]              INT            NULL,
    [ChecklistEnrolmentID]            INT            NULL,
    [AccidentCaseID]                  INT            NULL,
    [AccidentFormTypeID]              INT            NULL,
    [EmployeeID]                      INT            NULL,
    [LocationID]                      INT            NULL,
    [CompletedDate]                   DATETIMEOFFSET (7) NULL,
    [UserAreaID]                      INT            NOT NULL,
    [CreatedByUserID]                 INT            NOT NULL,
    [CreatedDate]                     DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]            INT            NULL,
    [ModifiedDate]                DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]                INT            NULL,
    [ArchivedDate]                    DATETIMEOFFSET (7) NULL,
    [HasFailedCriticalQuestion]       BIT            CONSTRAINT [DF__Questionn__HasFa__08CB2759] DEFAULT ((0)) NOT NULL,
    [MajorNonConformityCount]         INT            DEFAULT ((0)) NOT NULL,
    [MinorNonConformityCount]         INT            DEFAULT ((0)) NOT NULL,
    [CompliantCount]                  INT            DEFAULT ((0)) NOT NULL,
    [CourseEnrolmentID]               INT            NULL,
    [IsSignOff]                       BIT            DEFAULT ((0)) NOT NULL,
    [OrgGroupID]                      INT            NULL,
    [IsSignedOff]                     BIT            DEFAULT ((0)) NOT NULL,
    [CompletedTimeframe]              CHAR (2)       NULL,
    [IsAnonymousSubmission]           BIT            DEFAULT ((0)) NOT NULL,
    [IsApprovedSubmission]            BIT            DEFAULT ((1)) NOT NULL,
    [ManagerEmployeeEmail]            NVARCHAR (255) NULL,
    [PortalAccessToken]               NVARCHAR (20)  NULL,
    [InductionEnrolmentID]            INT            NULL,
    CONSTRAINT [PK__Question__30E353278A4CBDBE] PRIMARY KEY CLUSTERED ([QuestionnaireResponseID] ASC),
    CONSTRAINT [FK_QuestionnaireResponse_AccidentCase] FOREIGN KEY ([AccidentCaseID]) REFERENCES [V7].[AccidentCase] ([AccidentCaseID]),
    CONSTRAINT [FK_QuestionnaireResponse_AccidentFormTypeID] FOREIGN KEY ([AccidentFormTypeID]) REFERENCES [V7].[AccidentFormType] ([AccidentFormTypeID]),
    CONSTRAINT [FK_QuestionnaireResponse_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_QuestionnaireResponse_ChecklistEnrolmentID] FOREIGN KEY ([ChecklistEnrolmentID]) REFERENCES [V7].[ChecklistEnrolment] ([ChecklistEnrolmentID]),
    CONSTRAINT [FK_QuestionnaireResponse_CourseEnrollmentID] FOREIGN KEY ([CourseEnrollmentID]) REFERENCES [V7].[CourseEnrollment] ([CourseEnrollmentID]),
    CONSTRAINT [FK_QuestionnaireResponse_CourseEnrolment] FOREIGN KEY ([CourseEnrolmentID]) REFERENCES [V7].[CourseEnrolment] ([CourseEnrolmentID]),
    CONSTRAINT [FK_QuestionnaireResponse_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_QuestionnaireResponse_EmployeeID] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_QuestionnaireResponse_InductionEnrolmentID] FOREIGN KEY ([InductionEnrolmentID]) REFERENCES [V7].[InductionEnrolment] ([InductionEnrolmentID]),
    CONSTRAINT [FK_QuestionnaireResponse_LocationID] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_QuestionnaireResponse_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_QuestionnaireResponse_OrgGroupID] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_QuestionnaireResponse_Questionnaire] FOREIGN KEY ([QuestionnaireID]) REFERENCES [V7].[Questionnaire] ([QuestionnaireID]),
    CONSTRAINT [FK_QuestionnaireResponse_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_QuestionnaireResponse_Complex]
    ON [V7].[QuestionnaireResponse]([ArchivedDate] ASC, [IsFinished] ASC, [UserAreaID] ASC)
    INCLUDE([QuestionnaireID]);


GO
CREATE NONCLUSTERED INDEX [IX_QuestionnaireResponse_QuestionnaireID_ChecklistEnrolmentID_UserAreaID_ArchivedDate_CourseEnrolmentID]
    ON [V7].[QuestionnaireResponse]([QuestionnaireID] ASC, [ChecklistEnrolmentID] ASC, [UserAreaID] ASC, [ArchivedDate] ASC, [CourseEnrolmentID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_QuestionnaireResponse_QuestionnaireID_UserAreaID_ArchivedDate_includes]
    ON [V7].[QuestionnaireResponse]([QuestionnaireID] ASC, [UserAreaID] ASC, [ArchivedDate] ASC)
    INCLUDE([QuestionnaireResponseID], [IsFinished], [TotalScore], [MaxScore], [ChecklistEnrolmentID], [EmployeeID], [LocationID], [CompletedDate], [CreatedDate]);

