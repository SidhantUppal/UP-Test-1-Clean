CREATE TABLE [V7].[AssetStatusChange] (
    [AssetStatusChangeID]     INT             IDENTITY (1, 1) NOT NULL,
    [AssetID]                 INT             NOT NULL,
    [AssetStatusChangeTypeID] INT             NOT NULL,
    [ChangeCost]              NUMERIC (10, 2) NOT NULL,
    [ChangeDate]              DATETIMEOFFSET (7) NOT NULL,
    [ChangeComments]          NVARCHAR (MAX)  NULL,
    [CreatedByUserID]         INT             NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([AssetStatusChangeID] ASC)
);

