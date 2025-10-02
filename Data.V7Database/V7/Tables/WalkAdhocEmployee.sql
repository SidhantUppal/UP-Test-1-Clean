CREATE TABLE [V7].[WalkAdhocEmployee] (
    [WalkAdhocEmployeeID]  INT      IDENTITY (1, 1) NOT NULL,
    [WalkID]               INT      NOT NULL,
    [EmployeeID]           INT      NOT NULL,
    [HasAccessFrom]        DATETIMEOFFSET (7) NULL,
    [HasAccessTo]          DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]      INT      NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT      NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT      NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([WalkAdhocEmployeeID] ASC),
    CONSTRAINT [FK_WalkAdhocEmployee_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_WalkAdhocEmployee_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_WalkAdhocEmployee_EmployeeID] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_WalkAdhocEmployee_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_WalkAdhocEmployee_WalkID] FOREIGN KEY ([WalkID]) REFERENCES [V7].[Walk] ([WalkID])
);

