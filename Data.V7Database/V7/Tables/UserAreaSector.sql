CREATE TABLE [V7].[UserAreaSector] (
    [UserAreaSectorID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]       INT NOT NULL,
    [SectorTypeID]     INT NOT NULL,
    [IsPrimary]        BIT DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaSectorID] ASC),
    CONSTRAINT [FK_UserAreaSector_SectorType] FOREIGN KEY ([SectorTypeID]) REFERENCES [V7].[SectorType] ([SectorTypeID]),
    CONSTRAINT [FK_UserAreaSector_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_UserAreaSector_UserArea_SectorType]
    ON [V7].[UserAreaSector]([UserAreaID] ASC, [SectorTypeID] ASC)
    INCLUDE([IsPrimary]);

