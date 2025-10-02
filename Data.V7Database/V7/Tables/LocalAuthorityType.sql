CREATE TABLE [V7].[LocalAuthorityType] (
    [LocalAuthorityTypeID]   INT           NOT NULL,
    [GeographicalAreaTypeID] INT           NOT NULL,
    [Reference]              NVARCHAR (50) NOT NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([LocalAuthorityTypeID] ASC),
    CONSTRAINT [FK_LocalAuthorityType_GeographicalAreaTypeID] FOREIGN KEY ([GeographicalAreaTypeID]) REFERENCES [V7].[GeographicalAreaType] ([GeographicalAreaTypeID])
);

