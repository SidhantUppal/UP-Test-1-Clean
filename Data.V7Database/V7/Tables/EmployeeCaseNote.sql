CREATE TABLE [V7].[EmployeeCaseNote] (
    [EmployeeCaseNoteID] INT            IDENTITY (1, 1) NOT NULL,
    [EmployeeCaseID]     INT            NOT NULL,
    [Note]               NVARCHAR (MAX) NOT NULL,
    [CreatedByUserID]    INT            NOT NULL,
    [CreatedDate]        DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([EmployeeCaseNoteID] ASC),
    CONSTRAINT [FK_EmployeeCaseNote_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeCaseNote_EmployeeCase] FOREIGN KEY ([EmployeeCaseID]) REFERENCES [V7].[EmployeeCase] ([EmployeeCaseID])
);


GO
CREATE NONCLUSTERED INDEX [IX_EmployeeCaseNote_Note]
    ON [V7].[EmployeeCaseNote]([EmployeeCaseID] ASC)
    INCLUDE([Note], [CreatedByUserID], [CreatedDate]);

