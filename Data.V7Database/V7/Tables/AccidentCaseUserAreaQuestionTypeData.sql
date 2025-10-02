CREATE TABLE [V7].[AccidentCaseUserAreaQuestionTypeData] (
    [AccidentCaseUserAreaQuestionTypeDataID] INT            IDENTITY (1, 1) NOT NULL,
    [AccidentCaseID]                         INT            NOT NULL,
    [UserAreaQuestionTypeID]                 INT            NOT NULL,
    [UserAreaQuestionTypeVALUE]              NVARCHAR (250) NOT NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AccidentCaseUserAreaQuestionTypeDataID] ASC),
    CONSTRAINT [FK_AccidentCaseUserAreaQuestionTypeData_AccidentCaseID] FOREIGN KEY ([AccidentCaseID]) REFERENCES [V7].[AccidentCase] ([AccidentCaseID]),
    CONSTRAINT [FK_AccidentCaseUserAreaQuestionTypeData_UserAreaQuestionTypeID] FOREIGN KEY ([UserAreaQuestionTypeID]) REFERENCES [V7].[UserAreaQuestionType] ([UserAreaQuestionTypeID]),
    CONSTRAINT [FK_AccidentCaseUserAreaQuestionTypeData_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentCaseUserAreaQuestionTypeData_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentCaseUserAreaQuestionTypeData_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

