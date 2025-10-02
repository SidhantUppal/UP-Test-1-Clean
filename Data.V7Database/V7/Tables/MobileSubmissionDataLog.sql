CREATE TABLE [V7].[MobileSubmissionDataLog] (
    [MobileSubmissionDataLogID] INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                INT            NULL,
    [UserID]                    INT            NULL,
    [IsError]                   BIT            DEFAULT ((1)) NOT NULL,
    [UserName]                  NVARCHAR (128) NULL,
    [Module]                    NVARCHAR (128) NULL,
    [ViewModel]                 NVARCHAR (128) NULL,
    [CallStack]                 NVARCHAR (512) NULL,
    [SyncData]                  NVARCHAR (MAX) NULL,
    [ErrorMessage]              NVARCHAR (MAX) NULL,
    [SubmissionDate]            DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([MobileSubmissionDataLogID] ASC),
    CONSTRAINT [FK_MobileSubmissionDataLog_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_MobileSubmissionDataLog_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

