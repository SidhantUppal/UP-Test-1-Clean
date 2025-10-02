CREATE TABLE [V7].[SafeWorkingProcedureStep] (
    [SafeWorkingProcedureStepID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                 INT                NOT NULL,
    [SafeWorkingProcedureID]     INT                NOT NULL,
    [StepNumber]                 INT                NOT NULL,
    [StepTitle]                  NVARCHAR (255)     NOT NULL,
    [StepDescription]            NVARCHAR (MAX)     NOT NULL,
    [HazardControls]             NVARCHAR (MAX)     NULL,
    [CriticalControlPoint]       BIT                DEFAULT ((0)) NULL,
    [VerificationRequired]       BIT                DEFAULT ((0)) NULL,
    [VerificationMethod]         NVARCHAR (500)     NULL,
    [RequiredResources]          NVARCHAR (MAX)     NULL,
    [RequiredDocuments]          NVARCHAR (MAX)     NULL,
    [WarningsAndCautions]        NVARCHAR (MAX)     NULL,
    [Notes]                      NVARCHAR (MAX)     NULL,
    [CreatedByUserID]            INT                NOT NULL,
    [CreatedDate]                DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]       INT                NULL,
    [ModifiedDate]           DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]           INT                NULL,
    [ArchivedDate]               DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([SafeWorkingProcedureStepID] ASC),
    CONSTRAINT [FK_SafeWorkingProcedureStep_SafeWorkingProcedure] FOREIGN KEY ([SafeWorkingProcedureID]) REFERENCES [V7].[SafeWorkingProcedure] ([SafeWorkingProcedureID]) ON DELETE CASCADE,
    CONSTRAINT [FK_SafeWorkingProcedureStep_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_SafeWorkingProcedureStep_SafeWorkingProcedureID]
    ON [V7].[SafeWorkingProcedureStep]([SafeWorkingProcedureID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_SafeWorkingProcedureStep_UserAreaID]
    ON [V7].[SafeWorkingProcedureStep]([UserAreaID] ASC);

