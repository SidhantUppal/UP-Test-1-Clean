CREATE TABLE [V7].[AssetInspectionCrimsonImportSuccess] (
    [AssetInspectionCrimsonImportSuccessID] INT           IDENTITY (1, 1) NOT NULL,
    [AssetInspectionCrimsonImportID]        INT           NOT NULL,
    [AssetInspectionID]                     INT           NOT NULL,
    [CrimsonRecordID]                       NVARCHAR (20) NOT NULL,
    [ProcessedDate]                         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AssetInspectionCrimsonImportSuccessID] ASC),
    CONSTRAINT [FK_AssetInspectionCrimsonImportSuccess_AssetInspection] FOREIGN KEY ([AssetInspectionID]) REFERENCES [V7].[AssetInspection] ([AssetInspectionID]),
    CONSTRAINT [FK_AssetInspectionCrimsonImportSuccess_AssetInspectionCrimsonImport] FOREIGN KEY ([AssetInspectionCrimsonImportID]) REFERENCES [V7].[AssetInspectionCrimsonImport] ([AssetInspectionCrimsonImportID])
);

