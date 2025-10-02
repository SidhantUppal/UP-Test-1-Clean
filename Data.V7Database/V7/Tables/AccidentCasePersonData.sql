CREATE TABLE [V7].[AccidentCasePersonData] (
    [AccidentCasePersonDataID]  INT            IDENTITY (1, 1) NOT NULL,
    [AccidentCaseID]            INT            NOT NULL,
    [AccidentFormID]            INT            NOT NULL,
    [AccidentPersonTypeID]      INT            NOT NULL,
    [EmployeeID]                INT            NULL,
    [EmploymentStatusTypeTitle] NVARCHAR (100) NULL,
    [Name]                      NVARCHAR (255) NULL,
    [Address]                   NVARCHAR (MAX) NULL,
    [Email]                     NVARCHAR (255) NULL,
    [PhoneNo]                   NVARCHAR (50)  NULL,
    [EmploymentStatusTypeID]    INT            NULL,
    [GenderTypeID]              INT            NULL,
    [Title]                     NVARCHAR (35)  NULL,
    [FirstName]                 NVARCHAR (35)  NULL,
    [LastName]                  NVARCHAR (35)  NULL,
    [AddressID]                 INT            NULL,
    [JobTitle]                  NVARCHAR (50)  NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__Accident__BD78B5897FC6992A] PRIMARY KEY CLUSTERED ([AccidentCasePersonDataID] ASC),
    CONSTRAINT [FK_AccidentCasePersonData_AccidentCase] FOREIGN KEY ([AccidentCaseID]) REFERENCES [V7].[AccidentCase] ([AccidentCaseID]),
    CONSTRAINT [FK_AccidentCasePersonData_AccidentForm] FOREIGN KEY ([AccidentFormID]) REFERENCES [V7].[AccidentForm] ([AccidentFormID]),
    CONSTRAINT [FK_AccidentCasePersonData_AccidentPersonType] FOREIGN KEY ([AccidentPersonTypeID]) REFERENCES [V7].[AccidentPersonType] ([AccidentPersonTypeID]),
    CONSTRAINT [FK_AccidentCasePersonData_Address] FOREIGN KEY ([AddressID]) REFERENCES [V7].[Address] ([AddressID]),
    CONSTRAINT [FK_AccidentCasePersonData_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentCasePersonData_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentCasePersonData_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_AccidentCasePersonData_EmploymentStatusType] FOREIGN KEY ([EmploymentStatusTypeID]) REFERENCES [V7].[EmploymentStatusType] ([EmploymentStatusTypeID]),
    CONSTRAINT [FK_AccidentCasePersonData_GenderType] FOREIGN KEY ([GenderTypeID]) REFERENCES [V7].[GenderType] ([GenderTypeID]),
    CONSTRAINT [FK_AccidentCasePersonData_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_AccidentCasePersonData_PersonData]
    ON [V7].[AccidentCasePersonData]([AccidentCaseID] ASC, [AccidentFormID] ASC)
    INCLUDE([AccidentPersonTypeID], [EmploymentStatusTypeTitle], [Name], [Address]);


GO
CREATE NONCLUSTERED INDEX [IX_AccidentCasePersonData_RIDDORPersonData]
    ON [V7].[AccidentCasePersonData]([AccidentCaseID] ASC)
    INCLUDE([EmployeeID], [EmploymentStatusTypeID], [GenderTypeID], [Title], [FirstName], [LastName], [AddressID], [Email], [PhoneNo], [JobTitle]);

