CREATE TABLE [V7].[ChecklistAssetInspection] (
    [ChecklistAssetInspectionID] INT IDENTITY (1, 1) NOT NULL,
    [AssetInspectionTypeID]      INT NOT NULL,
    [ChecklistID]                INT NOT NULL,
    PRIMARY KEY CLUSTERED ([ChecklistAssetInspectionID] ASC),
    CONSTRAINT [FK_ChecklistAssetInspection_AssetInspectionType] FOREIGN KEY ([AssetInspectionTypeID]) REFERENCES [V7].[AssetInspectionType] ([AssetInspectionTypeID]),
    CONSTRAINT [FK_ChecklistAssetInspection_Checklist] FOREIGN KEY ([ChecklistID]) REFERENCES [V7].[Checklist] ([ChecklistID])
);

