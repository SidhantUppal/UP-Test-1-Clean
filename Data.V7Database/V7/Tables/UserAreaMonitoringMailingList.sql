CREATE TABLE [V7].[UserAreaMonitoringMailingList] (
    [UserAreaMonitoringMailingListID] INT            IDENTITY (1, 1) NOT NULL,
    [V5MailingListID]                 INT            NULL,
    [UserAreaID]                      INT            NOT NULL,
    [Name]                            NVARCHAR (250) NULL,
    [Email]                           NVARCHAR (250) NULL,
    [EmployeeID]                      INT            NULL,
    [CreatedByUserID]                 INT            NOT NULL,
    [CreatedDate]                     DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]            INT            NULL,
    [ModifiedDate]                DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]                INT            NULL,
    [ArchivedDate]                    DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaMonitoringMailingListID] ASC),
    CONSTRAINT [FK_UserAreaMonitoringMailingList_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaMonitoringMailingList_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaMonitoringMailingList_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_UserAreaMonitoringMailingList_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaMonitoringMailingList_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

