CREATE TABLE [V7].[AccidentCaseNote] (
    [AccidentCaseNoteID]   INT            IDENTITY (1, 1) NOT NULL,
    [AccidentCaseID]       INT            NOT NULL,
    [Notes]                NVARCHAR (MAX) NOT NULL,
    [UserAreaID]           INT            NOT NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [IsSignOff]            BIT            CONSTRAINT [DF__AccidentC__IsSig__365E7E8D] DEFAULT ((0)) NOT NULL,
    [SignatureText]        NVARCHAR (MAX) NULL,
    CONSTRAINT [PK__Accident__48993F37BD90006A] PRIMARY KEY CLUSTERED ([AccidentCaseNoteID] ASC),
    CONSTRAINT [FK_AccidentCaseNote_AccidentCase] FOREIGN KEY ([AccidentCaseID]) REFERENCES [V7].[AccidentCase] ([AccidentCaseID]),
    CONSTRAINT [FK_AccidentCaseNote_ArchivedByUserID] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentCaseNote_CreatedByUserID] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentCaseNote_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentCaseNote_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_AccidentCaseNote_AccidentCaseID_UserAreaID_ArchivedDate]
    ON [V7].[AccidentCaseNote]([AccidentCaseID] ASC, [UserAreaID] ASC, [ArchivedDate] ASC);

