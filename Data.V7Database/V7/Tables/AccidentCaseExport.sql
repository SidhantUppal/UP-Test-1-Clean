CREATE TABLE [V7].[AccidentCaseExport] (
    [AccidentCaseExportID] INT             IDENTITY (1, 1) NOT NULL,
    [AccidentCaseID]       INT             NOT NULL,
    [UserAreaID]           INT             NOT NULL,
    [ExportData]           VARBINARY (MAX) NOT NULL,
    [EmailedTo]            NVARCHAR (MAX)  NULL,
    [CreatedByUserID]      INT             NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([AccidentCaseExportID] ASC),
    CONSTRAINT [FK_AccidentCaseExport_AccidentCase] FOREIGN KEY ([AccidentCaseID]) REFERENCES [V7].[AccidentCase] ([AccidentCaseID]),
    CONSTRAINT [FK_AccidentCaseExport_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentCaseExport_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

