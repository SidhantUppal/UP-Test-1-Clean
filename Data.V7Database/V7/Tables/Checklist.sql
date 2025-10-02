CREATE TABLE [V7].[Checklist] (
    [ChecklistID]                               INT            IDENTITY (1, 1) NOT NULL,
    [Reference]                                 NVARCHAR (50)  NULL,
    [ChecklistTypeID]                           INT            NOT NULL,
    [ChecklistSectorTypeID]                     INT            NULL,
    [SectorTypeID]                              INT            NULL,
    [UserAreaID]                                INT            NULL,
    [OriginalQuestionnaireID]                   INT            NULL,
    [RequiresRenewal]                           BIT            CONSTRAINT [DF__tmp_ms_xx__Requi__36BC0F3B] DEFAULT ((0)) NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [EmailSubject] NVARCHAR (512) NULL,
    [EmailText] NVARCHAR (MAX) NULL,
    [RenewalEmailSubject] NVARCHAR (512) NULL,
    [RenewalEmailText] NVARCHAR (MAX) NULL,
    [RenewalFrequencyTypeID]                    INT            NULL,
    [Notes]                                     NVARCHAR (MAX) NULL,
    [AllowFurtherActions]                       BIT            CONSTRAINT [DF__tmp_ms_xx__Allow__37B03374] DEFAULT ((1)) NOT NULL,
    [IsEvidenceRequiredToCloseFurtherAction]    BIT            CONSTRAINT [DF__Checklist__IsEvi__280F93DF] DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]                           INT            NOT NULL,
    [CreatedDate]                               DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]                      INT            NULL,
    [ModifiedDate]                          DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]                          INT            NULL,
    [ArchivedDate]                              DATETIMEOFFSET (7) NULL,
    [ManagerEmployeeID]                         INT            NULL,
    [ConformityTypeID]                          INT            NULL,
    [OrgGroupID]                                INT            NULL,
    [IsEnvironmental]                           BIT            CONSTRAINT [DF_Checklist_IsEnvironmental] DEFAULT ((0)) NOT NULL,
    [IsHidden]                                  BIT            CONSTRAINT [DF__Checklist__IsHid__25D245B2] DEFAULT ((0)) NOT NULL,
    [DeleteOverdueAssignmentsOnChecklistDelete] BIT            DEFAULT ((0)) NOT NULL,
    [AllowMajorMinorNonConformity]              BIT            DEFAULT ((0)) NOT NULL,
    [HasRelaxedValidation]                      BIT            DEFAULT ((0)) NOT NULL,
    [HasCompleteAgainEnabled]                   BIT            DEFAULT ((0)) NOT NULL,
    [DisableEmails]                             BIT            DEFAULT ((0)) NOT NULL,
    [IsForHomeWorking]                          BIT            DEFAULT ((0)) NOT NULL,
    [IsActive]                                  BIT            DEFAULT ((1)) NOT NULL,
    [IsSignOff]                                 BIT            DEFAULT ((0)) NOT NULL,
    [SignOffChecklistID]                        INT            NULL,
    [DisableAutoNumbering]                      BIT            DEFAULT ((0)) NOT NULL,
    [IsDefaultForContractor]                    BIT            DEFAULT ((0)) NOT NULL,
    [AllowMultipleOpenAssignmentsPerAssignee]   BIT            DEFAULT ((0)) NOT NULL,
    [IsForDSE]                                  BIT            DEFAULT ((0)) NOT NULL,
    [AllowBulkPrintingOfResponses]              BIT            DEFAULT ((0)) NOT NULL,
    [CaptureCompletionTimeframe]                BIT            DEFAULT ((0)) NOT NULL,
    [DefaultLocationID]                         INT            NULL,
    [AllowSelfAssignmentOnCompleteNow]          BIT            DEFAULT ((0)) NOT NULL,
    [SendRenewalReminderOnCompleteNow]          BIT            DEFAULT ((0)) NOT NULL,
    [IsDSE]                                     BIT            DEFAULT ((0)) NOT NULL,
    [ExposureTypeID]                            INT            NULL,
    CONSTRAINT [PK__tmp_ms_x__4C1D49BA1BC3A26E] PRIMARY KEY CLUSTERED ([ChecklistID] ASC),
    CONSTRAINT [FK_Checklist_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Checklist_ChecklistSectorTypeID] FOREIGN KEY ([ChecklistSectorTypeID]) REFERENCES [V7].[ChecklistSectorType] ([ChecklistSectorTypeID]),
    CONSTRAINT [FK_Checklist_ChecklistTypeID] FOREIGN KEY ([ChecklistTypeID]) REFERENCES [V7].[ChecklistType] ([ChecklistTypeID]),
    CONSTRAINT [FK_Checklist_ConformityType] FOREIGN KEY ([ConformityTypeID]) REFERENCES [V7].[ConformityType] ([ConformityTypeID]),
    CONSTRAINT [FK_Checklist_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Checklist_DefaultLocationID] FOREIGN KEY ([DefaultLocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_Checklist_ExposureType] FOREIGN KEY ([ExposureTypeID]) REFERENCES [V7].[ExposureType] ([ExposureTypeID]),
    CONSTRAINT [FK_Checklist_FrequencyTypeID] FOREIGN KEY ([RenewalFrequencyTypeID]) REFERENCES [V7].[FrequencyType] ([FrequencyTypeID]),
    CONSTRAINT [FK_Checklist_ManagerEmployeeID] FOREIGN KEY ([ManagerEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_Checklist_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Checklist_OrgGroupID] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_Checklist_SectorTypeID] FOREIGN KEY ([SectorTypeID]) REFERENCES [V7].[SectorType] ([SectorTypeID]),
    CONSTRAINT [FK_Checklist_SignOffChecklistID] FOREIGN KEY ([SignOffChecklistID]) REFERENCES [V7].[Checklist] ([ChecklistID]),
    CONSTRAINT [FK_Checklist_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [ix_Checklist_OriginalQuestionnaireID]
    ON [V7].[Checklist]([OriginalQuestionnaireID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Checklist_UserArea]
    ON [V7].[Checklist]([UserAreaID] ASC, [ArchivedDate] ASC)
    INCLUDE([OriginalQuestionnaireID]);


GO
CREATE NONCLUSTERED INDEX [IX_UserAreaID]
    ON [V7].[Checklist]([UserAreaID] ASC);

