CREATE TABLE [V7].[AssetOrgGroup] (
    [AssetOrgGroupID] INT IDENTITY (1, 1) NOT NULL,
    [AssetID]         INT NOT NULL,
    [OrgGroupID]      INT NOT NULL,
    PRIMARY KEY CLUSTERED ([AssetOrgGroupID] ASC)
);

