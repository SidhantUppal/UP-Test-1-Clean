CREATE TABLE [V7].[AssetInspectionAllianzImport] (
    [AssetInspectionAllianzImportID] INT           IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                     INT           NOT NULL,
    [XMLFileName]                    NVARCHAR (30) NOT NULL,
    [XMLID]                          NVARCHAR (20) NOT NULL,
    [XMLReport]                      XML           NOT NULL,
    [TotalRecords]                   INT           DEFAULT ((0)) NOT NULL,
    [ImportDate]                     DATETIMEOFFSET (7) NOT NULL,
    [ProcessedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AssetInspectionAllianzImportID] ASC),
    CONSTRAINT [FK_AssetInspectionAllianzImport_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

