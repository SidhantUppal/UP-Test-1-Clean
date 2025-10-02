CREATE TABLE [V7].[AssetQRCode] (
    [AssetQRCodeID]        INT             IDENTITY (1, 1) NOT NULL,
    [AssetID]              INT             NOT NULL,
    [UserAreaID]           INT             NOT NULL,
    [QRCode]               VARBINARY (MAX) NOT NULL,
    [CreatedByUserID]      INT             NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT             NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT             NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [QRCodeType]           INT             NOT NULL,
    PRIMARY KEY CLUSTERED ([AssetQRCodeID] ASC)
);

