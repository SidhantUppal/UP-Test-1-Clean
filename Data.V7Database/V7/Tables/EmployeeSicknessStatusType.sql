CREATE TABLE [V7].[EmployeeSicknessStatusType] (
    [EmployeeSicknessStatusTypeID] INT            IDENTITY (1, 1) NOT NULL,
    [EmployeeID]                   INT            NOT NULL,
    [SicknessStatusTypeID]         INT            NOT NULL,
    [Note]                         NVARCHAR (255) NULL,
    [CreatedByUserID]              INT            NOT NULL,
    [DateSentHome]                 DATETIMEOFFSET (7) NULL,
    [ExpectedReturnDate]           DATETIMEOFFSET (7) NULL,
    [CreatedDate]                  DATETIMEOFFSET (7) NOT NULL,
    [UserAreaID]                   INT            NOT NULL,
    PRIMARY KEY CLUSTERED ([EmployeeSicknessStatusTypeID] ASC),
    CONSTRAINT [FK_EmployeeSicknessStatusType_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_EmployeeSicknessStatusType_SicknessStatusType] FOREIGN KEY ([SicknessStatusTypeID]) REFERENCES [V7].[SicknessStatusType] ([SicknessStatusTypeID]),
    CONSTRAINT [FK_EmployeeSicknessStatusType_User] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeSicknessStatusType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

