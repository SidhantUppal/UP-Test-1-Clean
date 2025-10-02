CREATE TABLE [V7].[AssetInspectionCrimsonImport] (
    [AssetInspectionCrimsonImportID] INT           IDENTITY (1, 1) NOT NULL,
    [XMLFileName]                    NVARCHAR (30) NOT NULL,
    [XMLID]                          NVARCHAR (20) NOT NULL,
    [XMLReport]                      XML           NOT NULL,
    [ImportDate]                     DATETIMEOFFSET (7) NOT NULL,
    [UserAreaID]                     INT           NOT NULL,
    [TotalRecords]                   INT           DEFAULT ((0)) NOT NULL,
    [ProcessedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AssetInspectionCrimsonImportID] ASC),
    CONSTRAINT [FK_AssetInspectionCrimsonImport_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

