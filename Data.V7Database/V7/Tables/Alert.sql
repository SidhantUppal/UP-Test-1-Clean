CREATE TABLE [V7].[Alert] (
    [AlertID]              INT            IDENTITY (1, 1) NOT NULL,
    [AlertTypeID]          INT            NOT NULL,
    [UserAreaID]           INT            NOT NULL,
    [EmployeeID]           INT            NOT NULL,
    [SeverityTypeID]       INT            NULL,
    [MoreInfo]             NVARCHAR (MAX) NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [ReadDate]             DATETIMEOFFSET (7) NULL,
    [Description]          NVARCHAR (MAX) NULL,
    [SystemProductTypeID]  INT            NULL,
    CONSTRAINT [PK__Alert__EBB16AEDE3ABAC08] PRIMARY KEY CLUSTERED ([AlertID] ASC),
    CONSTRAINT [FK_Alert_AlertType] FOREIGN KEY ([AlertTypeID]) REFERENCES [V7].[AlertType] ([AlertTypeID]),
    CONSTRAINT [FK_Alert_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Alert_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Alert_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_Alert_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Alert_SeverityType] FOREIGN KEY ([SeverityTypeID]) REFERENCES [V7].[SeverityType] ([SeverityTypeID]),
    CONSTRAINT [FK_Alert_SystemProductType] FOREIGN KEY ([SystemProductTypeID]) REFERENCES [V7].[SystemProductType] ([SystemProductTypeID]),
    CONSTRAINT [FK_Alert_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_Alert_EmployeeID_includes]
    ON [V7].[Alert]([EmployeeID] ASC)
    INCLUDE([AlertTypeID], [UserAreaID], [SeverityTypeID], [MoreInfo], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedDate], [ReadDate], [Description]);

