CREATE TABLE [V7].[ReportingFieldType] (
    [ReportingFieldTypeID]   INT           NOT NULL,
    [FieldName]              VARCHAR (50)  NOT NULL,
    [AnswerTypeID]           INT           NOT NULL,
    [AnswerTypeOptionsTable] NVARCHAR (50) NULL,
    [IsRIDDORReportable]     BIT           DEFAULT ((0)) NOT NULL,
    [UserAreaID]             INT           NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([ReportingFieldTypeID] ASC),
    CONSTRAINT [FK_ReportingFieldType_AnswerType] FOREIGN KEY ([AnswerTypeID]) REFERENCES [V7].[AnswerType] ([AnswerTypeID]),
    CONSTRAINT [FK_ReportingFieldType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

