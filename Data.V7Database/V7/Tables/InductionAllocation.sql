CREATE TABLE [V7].[InductionAllocation] (
    [InductionAllocationID] INT              IDENTITY (1, 1) NOT NULL,
    [InductionBundleID]     INT              NOT NULL,
    [UserAreaID]            INT              NOT NULL,
    [EmployeeID]            INT              NOT NULL,
    [RenewalEnabled]        BIT              NULL,
    [SendDate]              DATETIMEOFFSET (7) NOT NULL,
    [DueDate]               DATETIMEOFFSET (7) NOT NULL,
    [InvitationGUID]        UNIQUEIDENTIFIER NOT NULL,
    [CreatedByUserID]       INT              NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]  INT              NULL,
    [ModifiedDate]      DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]      INT              NULL,
    [ArchivedDate]          DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([InductionAllocationID] ASC),
    CONSTRAINT [FK_InductionAllocation_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_InductionAllocation_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_InductionAllocation_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_InductionAllocation_InductionBundle] FOREIGN KEY ([InductionBundleID]) REFERENCES [V7].[InductionBundle] ([InductionBundleID]),
    CONSTRAINT [FK_InductionAllocation_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_InductionAllocation_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

