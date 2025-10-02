CREATE TABLE [V7].[AssetInspectionAllianzImportSuccess] (
    [AssetInspectionAllianzImportSuccessID] INT           IDENTITY (1, 1) NOT NULL,
    [AssetInspectionAllianzImportID]        INT           NOT NULL,
    [AssetInspectionID]                     INT           NOT NULL,
    [AllianzRecordID]                       NVARCHAR (20) NOT NULL,
    [ProcessedDate]                         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AssetInspectionAllianzImportSuccessID] ASC),
    CONSTRAINT [FK_AssetInspectionAllianzImportSuccess_AssetInspection] FOREIGN KEY ([AssetInspectionID]) REFERENCES [V7].[AssetInspection] ([AssetInspectionID]),
    CONSTRAINT [FK_AssetInspectionAllianzImportSuccess_AssetInspectionAllianzImport] FOREIGN KEY ([AssetInspectionAllianzImportID]) REFERENCES [V7].[AssetInspectionAllianzImport] ([AssetInspectionAllianzImportID])
);

