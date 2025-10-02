CREATE TABLE [V7].[InjuryTypeBodyPart] (
    [InjuryTypeBodyPartID] INT IDENTITY (1, 1) NOT NULL,
    [InjuryTypeID]         INT NOT NULL,
    [BodyPartID]           INT NULL,
    [IsRIDDOrReportable]   BIT NOT NULL,
    PRIMARY KEY CLUSTERED ([InjuryTypeBodyPartID] ASC),
    CONSTRAINT [FK_InjuryTypeBodyPart_BodyPartID] FOREIGN KEY ([BodyPartID]) REFERENCES [V7].[BodyPart] ([BodyPartID]),
    CONSTRAINT [FK_InjuryTypeBodyPart_InjuryTypeID] FOREIGN KEY ([InjuryTypeID]) REFERENCES [V7].[InjuryType] ([InjuryTypeID])
);

