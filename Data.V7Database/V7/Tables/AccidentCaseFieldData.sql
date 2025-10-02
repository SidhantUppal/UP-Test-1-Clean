CREATE TABLE [V7].[AccidentCaseFieldData] (
    [AccidentCaseFieldDataID]    INT            IDENTITY (1, 1) NOT NULL,
    [AccidentCaseID]             INT            NOT NULL,
    [AccidentFormID]             INT            NOT NULL,
    [AccidentQuestionTypeID]     INT            NULL,
    [FieldValue]                 NVARCHAR (MAX) NULL,
    [IncludeInCaseDetails]       BIT            CONSTRAINT [DF__AccidentC__Inclu__11C12B64] DEFAULT ((1)) NOT NULL,
    [AdditionalValue]            NVARCHAR (MAX) NULL,
    [UserAreaAccidentQuestionID] INT            NULL,
    [ReportValue]                INT            NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__Accident__2E99560A0E6EC160] PRIMARY KEY CLUSTERED ([AccidentCaseFieldDataID] ASC),
    CONSTRAINT [FK_AccidentCaseFieldData_AccidentCase] FOREIGN KEY ([AccidentCaseID]) REFERENCES [V7].[AccidentCase] ([AccidentCaseID]),
    CONSTRAINT [FK_AccidentCaseFieldData_AccidentForm] FOREIGN KEY ([AccidentFormID]) REFERENCES [V7].[AccidentForm] ([AccidentFormID]),
    CONSTRAINT [FK_AccidentCaseFieldData_AccidentQuestionType] FOREIGN KEY ([AccidentQuestionTypeID]) REFERENCES [V7].[AccidentQuestionType] ([AccidentQuestionTypeID]),
    CONSTRAINT [FK_AccidentCaseFieldData_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentCaseFieldData_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentCaseFieldData_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentCaseFieldData_UserAreaAccidentQuestion] FOREIGN KEY ([UserAreaAccidentQuestionID]) REFERENCES [V7].[UserAreaAccidentQuestion] ([UserAreaAccidentQuestionID])
);


GO
CREATE NONCLUSTERED INDEX [IX_AccidentCaseFieldData_FieldValue]
    ON [V7].[AccidentCaseFieldData]([AccidentCaseID] ASC, [AccidentFormID] ASC)
    INCLUDE([AccidentQuestionTypeID], [UserAreaAccidentQuestionID], [FieldValue], [AdditionalValue]);

