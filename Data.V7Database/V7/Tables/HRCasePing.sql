CREATE TABLE [V7].[HRCasePing] (
    [HRCasePingID]    INT                IDENTITY (1, 1) NOT NULL,
    [HRCaseID]        INT                NOT NULL,
    [UserID]          INT                NOT NULL,
    [EmulatingUserID] INT                NULL,
    [DateTime]        DATETIMEOFFSET (7) NOT NULL,
    [IsViaAJAX]       BIT                DEFAULT ((0)) NOT NULL,
    [SessionID]       NVARCHAR (36)      NULL,
    PRIMARY KEY CLUSTERED ([HRCasePingID] ASC),
    CONSTRAINT [FK_HRCasePing_EmulatingUser] FOREIGN KEY ([EmulatingUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCasePing_HRCase] FOREIGN KEY ([HRCaseID]) REFERENCES [V7].[HRCase] ([HRCaseID]),
    CONSTRAINT [FK_HRCasePing_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_HRCasePing_HRCaseID_includes]
    ON [V7].[HRCasePing]([HRCaseID] ASC, [UserID] ASC, [EmulatingUserID] ASC)
    INCLUDE([DateTime], [IsViaAJAX]);

