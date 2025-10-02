CREATE TABLE [V7].[ChecklistResponseData] (
    [ChecklistResponseDataID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaFormResponseID]  INT                NOT NULL,
    [ResponseJSON]            NVARCHAR (MAX)     NOT NULL,
    [TotalScore]              AS                 (CONVERT([int],json_value([ResponseJSON],'$.totalScore'))) PERSISTED,
    [MaxPossibleScore]        AS                 (CONVERT([int],json_value([ResponseJSON],'$.maxPossibleScore'))) PERSISTED,
    [CompletionPercent]       AS                 (CONVERT([decimal](5,2),json_value([ResponseJSON],'$.completionPercent'))) PERSISTED,
    [FailedCritical]          AS                 (CONVERT([bit],json_value([ResponseJSON],'$.failedCritical'))) PERSISTED,
    [CreatedByUserID]         INT                NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]    INT                NULL,
    [ModifiedDate]        DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_ChecklistResponseData] PRIMARY KEY CLUSTERED ([ChecklistResponseDataID] ASC),
    CONSTRAINT [Check_ResponseJSON] CHECK (isjson([ResponseJSON])=(1)),
    CONSTRAINT [FK_ChecklistResponseData_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_ChecklistResponseData_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_ChecklistResponseData_UserAreaFormResponse] FOREIGN KEY ([UserAreaFormResponseID]) REFERENCES [V7].[UserAreaFormResponse] ([UserAreaFormResponseID])
);

