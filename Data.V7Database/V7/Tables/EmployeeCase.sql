CREATE TABLE [V7].[EmployeeCase] (
    [EmployeeCaseID]           INT             IDENTITY (1, 1) NOT NULL,
    [UserAreaID]               INT             NOT NULL,
    [EmployeeID]               INT             NOT NULL,
    [EmployeeCaseTypeID]       INT             NOT NULL,
    [EmployeeCaseStatusTypeID] INT             NOT NULL,
    [Title]                    NVARCHAR (255)  NOT NULL,
    [CreatedByUserID]          INT             NOT NULL,
    [CreatedDate]              DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]     INT             NULL,
    [ModifiedDate]         DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]         INT             NULL,
    [ArchivedDate]             DATETIMEOFFSET (7) NULL,
    [Comments]                 NVARCHAR (1000) NULL,
    PRIMARY KEY CLUSTERED ([EmployeeCaseID] ASC),
    CONSTRAINT [FK_EmployeeCase_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeCase_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeCase_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_EmployeeCase_EmployeeCaseStatusType] FOREIGN KEY ([EmployeeCaseStatusTypeID]) REFERENCES [V7].[EmployeeCaseStatusType] ([EmployeeCaseStatusTypeID]),
    CONSTRAINT [FK_EmployeeCase_EmployeeCaseType] FOREIGN KEY ([EmployeeCaseTypeID]) REFERENCES [V7].[EmployeeCaseType] ([EmployeeCaseTypeID]),
    CONSTRAINT [FK_EmployeeCase_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeCase_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

