CREATE TABLE [V7].[HRCaseTextBlockCollection] (
    [HRCaseTextBlockCollectionID] INT IDENTITY (1, 1) NOT NULL,
    [TextBlockCollectionID]       INT NOT NULL,
    [HRCaseID]                    INT NOT NULL,
    [HRCaseMeetingID]             INT NULL,
    PRIMARY KEY CLUSTERED ([HRCaseTextBlockCollectionID] ASC),
    CONSTRAINT [FK_HRCaseTextBlockCollection_HRCase] FOREIGN KEY ([HRCaseID]) REFERENCES [V7].[HRCase] ([HRCaseID]),
    CONSTRAINT [FK_HRCaseTextBlockCollection_HRCaseMeeting] FOREIGN KEY ([HRCaseMeetingID]) REFERENCES [V7].[HRCaseMeeting] ([HRCaseMeetingID]),
    CONSTRAINT [FK_HRCaseTextBlockCollection_TextBlockCollection] FOREIGN KEY ([TextBlockCollectionID]) REFERENCES [V7].[TextBlockCollection] ([TextBlockCollectionID]),
    CONSTRAINT [CK_HRCaseTextBlockCollection_Unique] UNIQUE NONCLUSTERED ([TextBlockCollectionID] ASC, [HRCaseID] ASC, [HRCaseMeetingID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_HRCaseTextBlockCollection_HRCaseID_includes]
    ON [V7].[HRCaseTextBlockCollection]([HRCaseID] ASC)
    INCLUDE([HRCaseTextBlockCollectionID], [TextBlockCollectionID], [HRCaseMeetingID]);

