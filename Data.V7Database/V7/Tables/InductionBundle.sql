CREATE TABLE [V7].[InductionBundle] (
    [InductionBundleID]    INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT            NOT NULL,
    [Title]                NVARCHAR (150) NOT NULL,
    [EmployeeTypeID]       INT            NOT NULL,
    [IsPublished]          BIT            DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([InductionBundleID] ASC),
    CONSTRAINT [FK_InductionBundle_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_InductionBundle_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_InductionBundle_EmployeeType] FOREIGN KEY ([EmployeeTypeID]) REFERENCES [V7].[EmployeeType] ([EmployeeTypeID]),
    CONSTRAINT [FK_InductionBundle_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_InductionBundle_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

