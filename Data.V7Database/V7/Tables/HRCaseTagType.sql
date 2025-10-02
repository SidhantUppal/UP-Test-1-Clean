CREATE TABLE [V7].[HRCaseTagType] (
    [HRCaseTagTypeID] INT IDENTITY (1, 1) NOT NULL,
    [HRCaseID]        INT NOT NULL,
    [TagTypeID]       INT NOT NULL,
    PRIMARY KEY CLUSTERED ([HRCaseTagTypeID] ASC),
    CONSTRAINT [FK_HRCaseTagType_HRCase] FOREIGN KEY ([HRCaseID]) REFERENCES [V7].[HRCase] ([HRCaseID]),
    CONSTRAINT [FK_HRCaseTagType_TagType] FOREIGN KEY ([TagTypeID]) REFERENCES [V7].[TagType] ([TagTypeID]),
    CONSTRAINT [CK_HRCaseTagType_Unique] UNIQUE NONCLUSTERED ([HRCaseID] ASC, [TagTypeID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_HRCaseTagType_HRCase_includes]
    ON [V7].[HRCaseTagType]([HRCaseID] ASC)
    INCLUDE([HRCaseTagTypeID], [TagTypeID]);


GO
CREATE NONCLUSTERED INDEX [IX_HRCaseTagType_TagType_includes]
    ON [V7].[HRCaseTagType]([TagTypeID] ASC)
    INCLUDE([HRCaseTagTypeID], [HRCaseID]);

