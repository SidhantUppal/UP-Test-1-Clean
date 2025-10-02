CREATE TABLE [V7].[HRTypeHRMeetingType] (
    [HRTypeHRMeetingTypeID] INT IDENTITY (1, 1) NOT NULL,
    [HRTypeID]              INT NOT NULL,
    [HRMeetingTypeID]       INT NOT NULL,
    PRIMARY KEY CLUSTERED ([HRTypeHRMeetingTypeID] ASC),
    CONSTRAINT [FK_HRTypeHRMeetingType_HRMeetingType] FOREIGN KEY ([HRMeetingTypeID]) REFERENCES [V7].[HRMeetingType] ([HRMeetingTypeID]),
    CONSTRAINT [FK_HRTypeHRMeetingType_HRType] FOREIGN KEY ([HRTypeID]) REFERENCES [V7].[HRType] ([HRTypeID]),
    CONSTRAINT [CK_HRTypeHRMeetingType_Unique] UNIQUE NONCLUSTERED ([HRTypeID] ASC, [HRMeetingTypeID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_HRTypeHRMeetingType_HRTypeID_includes]
    ON [V7].[HRTypeHRMeetingType]([HRTypeID] ASC)
    INCLUDE([HRTypeHRMeetingTypeID], [HRMeetingTypeID]);

