CREATE TABLE [V7].[HRCaseTimePad] (
    [HRCaseTimePadID]  INT                IDENTITY (1, 1) NOT NULL,
    [HRCaseID]         INT                NOT NULL,
    [UserID]           INT                NOT NULL,
    [EmulatingUserID]  INT                NULL,
    [StartDateTime]    DATETIMEOFFSET (7) NOT NULL,
    [EndDateTime]      DATETIMEOFFSET (7) NULL,
    [DurationInMins]   INT                NULL,
    [CreatedDate]      DATETIMEOFFSET (7) NOT NULL,
    [ModifiedDate] DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([HRCaseTimePadID] ASC),
    CONSTRAINT [FK_HRCaseTimePad_EmulatingUser] FOREIGN KEY ([EmulatingUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCaseTimePad_HRCase] FOREIGN KEY ([HRCaseID]) REFERENCES [V7].[HRCase] ([HRCaseID]),
    CONSTRAINT [FK_HRCaseTimePad_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_HRCaseTimePad_HRCaseID_EndDateTime_includes]
    ON [V7].[HRCaseTimePad]([HRCaseID] ASC, [UserID] ASC, [EmulatingUserID] ASC, [EndDateTime] ASC)
    INCLUDE([StartDateTime], [DurationInMins]);


GO
CREATE NONCLUSTERED INDEX [IX_HRCaseTimePad_HRCaseID_includes]
    ON [V7].[HRCaseTimePad]([HRCaseID] ASC, [UserID] ASC, [EmulatingUserID] ASC)
    INCLUDE([StartDateTime], [EndDateTime], [DurationInMins]);

