CREATE TABLE [V7].[AbsenceRequirement] (
    [AbsenceRequirementID] INT      IDENTITY (1, 1) NOT NULL,
    [AbsenceID]            INT      NOT NULL,
    [RequirementTypeID]    INT      NOT NULL,
    [TaskID]               INT      NULL,
    [IsRequired]           BIT      NOT NULL,
    [IsCompleted]          BIT      DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]      INT      NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT      NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT      NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AbsenceRequirementID] ASC),
    CONSTRAINT [FK_AbsenceRequirement_Absence] FOREIGN KEY ([AbsenceID]) REFERENCES [V7].[Absence] ([AbsenceID]),
    CONSTRAINT [FK_AbsenceRequirement_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AbsenceRequirement_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AbsenceRequirement_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AbsenceRequirement_RequirementType] FOREIGN KEY ([RequirementTypeID]) REFERENCES [V7].[RequirementType] ([RequirementTypeID]),
    CONSTRAINT [FK_AbsenceRequirement_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID])
);

