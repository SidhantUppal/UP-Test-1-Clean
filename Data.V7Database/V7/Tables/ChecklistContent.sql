CREATE TABLE [V7].[ChecklistContent] (
    [ChecklistContentID]   INT                IDENTITY (1, 1) NOT NULL,
    [ChecklistTemplateID]  INT                NOT NULL,
    [Version]              INT                DEFAULT ((1)) NOT NULL,
    [ContentJSON]          NVARCHAR (MAX)     NOT NULL,
    [QuestionCount]        AS                 (CONVERT([int],json_value([ContentJSON],'$.questionCount'))) PERSISTED,
    [MaxScore]             AS                 (CONVERT([int],json_value([ContentJSON],'$.maxScore'))) PERSISTED,
    [HasCriticalQuestions] AS                 (CONVERT([bit],json_value([ContentJSON],'$.hasCritical'))) PERSISTED,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_ChecklistContent] PRIMARY KEY CLUSTERED ([ChecklistContentID] ASC),
    CONSTRAINT [Check_ContentJSON] CHECK (isjson([ContentJSON])=(1)),
    CONSTRAINT [FK_ChecklistContent_ChecklistTemplate] FOREIGN KEY ([ChecklistTemplateID]) REFERENCES [V7].[ChecklistTemplate] ([ChecklistTemplateID]),
    CONSTRAINT [FK_ChecklistContent_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_ChecklistContent_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[Employee] ([EmployeeID])
);

